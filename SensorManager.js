import { LightSensor } from "./sensors/LightSensor.js";
import TemperatureSensor from "./sensors/TemperatureSensor.js";

//Look into singleton pattern for sensorManager

class SensorManager {
  //sensor manager contains a map of sensors
  constructor(sendData, envManager) {
    this.sensors = new Map();
    this.sendData = sendData;
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
    let sensor = this.helpCreateSensor(config, config.type);

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

  helpCreateSensor(config, type) {
    //CLass Factory Pattern
    //check notes below
    try {
      if (type === "Light") {
        return new LightSensor({
          ...config,
          sendData: this.sendData,
        });
      }

      if (type === "Temperature") {
        return new TemperatureSensor({
          ...config,
          getAmbientTemp: () => this.envManager.getAmbientTemperature(),
          sendData: this.sendData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { SensorManager };

//NOTES
//Use Mapping instead of if/else
// const sensorRegistry = {
//   Light: LightSensor,
//   Temperature: TemperatureSensor
// };

// helpCreateSensor(config, type) {
//   const SensorClass = sensorRegistry[type];
//   if (!SensorClass) throw new Error("Unknown sensor type");

//   return new SensorClass({
//     ...config,
//     sendData: this.sendData,
//   });
// }
