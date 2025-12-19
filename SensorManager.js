import { LightSensor } from "./sensors/Sensor.js";

class SensorManager {
  //sensor manager contains a map of sensors
  constructor(sendDataToWebSocket) {
    this.sensors = new Map();
    this.sendDataToWebSocket = sendDataToWebSocket;
  }

  createSensor(config) {
    if (this.sensors.has(config.sensorId)) {
      throw new Error("Sensor already exists");
    }

    let sensor;

    // create sensor
    if (config.type === "Light") {
      sensor = new LightSensor({
        ...config,
        sendDataToWebsocket: this.sendDataToWebsocket,
      });
    }

    //start sensor
    sensor.start();

    //store sensor in key value pair
    this.sensors.set(sensor.sensorId, sensor);
  }

  deleteSensor(sensorId) {}

  listSensors() { 
    //get the maps values, store it in an array,
    //then loop over the array
    [...this.sensors.values()].map(s => ({
      sensorId: s.sensorId,
      type: 
    }))
  }
  
  tick() {
    
  }
}

export { SensorManager };
