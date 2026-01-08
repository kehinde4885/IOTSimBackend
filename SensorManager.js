import { SensorRegistry } from "./sensors/SensorRegistry.js";

//Look into singleton pattern for sensorManager

class SensorManager {
  //sensor manager contains a map of sensors
  constructor(sendOverWebSocket, envManager) {
    this.sensors = new Map();
    this.sendOverWebSocket = sendOverWebSocket;
    this.envManager = envManager;
  }

  getSensor(id) {
    return this.sensors.get(id) || null;
  }

  createSensor(config) {
    if (this.sensors.has(config.sensorId)) {
      throw new Error("Sensor already exists");
    }

    // create sensor
    let sensor = this.helpCreateSensor(config);

    //start sensor
    sensor.start();

    //store sensor in key value pair
    this.sensors.set(sensor.sensorId, sensor);

    //this.tickPrint();
  }

  deleteSensor(sensorId) {
    const sensor = this.sensors.get(sensorId);

    if (!sensor) return;

    sensor.stop();
    this.sensors.delete(sensorId);
  }

  listSensors() {
    //get the maps values, store it in an array,
    //then loop over the array
    //also returns an array of the sensor objects
    // return [...this.sensors.values()].map((s) => ({
    //   sensorId: s.sensorId,
    //   type: s.type,
    //   interval: s.interval,
    //   value: s.value,
    // }));

    return [...this.sensors.values()].map((s) => {
      return s.itemize();
    });
  }

  simulateAll() {
    for (let sensor of this.sensors.values()) {
      sensor.simulate();
    }
  }

  tickPrint() {
    setInterval(() => {
      console.log(this.listSensors());
    }, 2000);
  }

  helpCreateSensor(config) {
    const entry = SensorRegistry[config.type];

    if (!entry) {
      throw new Error(`Unknown sensor type: ${config.type}`);
    }

    //destructure entry
    const { class: SensorClass, inject } = entry;

    return new SensorClass({
      ...config,
      sendOverWebSocket: this.sendOverWebSocket,
      //run the inject function
      // getAmbientTemp: () => manager.envManager.getAmbientTemperature(),
      ...inject(this),
    });
  }
}

export { SensorManager };
