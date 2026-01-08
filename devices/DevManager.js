import { HVAC } from "./Hvac.js";

export class DeviceManager {
  constructor(envManager, sensorManager) {
    this.devices = new Map();
    this.envManager = envManager;
    this.sensorManager = sensorManager;

    // console.log(this.sensorManager);
    // console.log(sensorManager);
  }

  //***create device based on config
  createDevice(config) {
    console.log("Dev Manager using config", config);

    if (this.devices.has(config.deviceId)) {
      throw new Error("Device already exists");
    }

    //create device
    /*instead of a method reference (passing a reference to the method)
    getTempSensor: this.sensorManager.getSensor

    We should pass a function , that calls the method. that way
    it is bound to its object
    getTempSensor: (id)=> this.sensorManager.getSensor(id)

    ❗ Never pass object methods as callbacks unless you bind or wrap them

    */

    let device = new HVAC({
      ...config,
      getTempSensor: (id) => this.sensorManager.getSensor(id),
      changeAmbientTempFunction: (change) =>
        this.envManager.changeAmbientTemperature(change),
    });

    this.devices.set(config.deviceId, device);
  }

  simulateAll() {
    for (let device of this.devices.values()) {
      device.simulate();
    }
  }

  listDevices() {
    //returns an array of devices
    return [...this.devices.values()].map((device) => {
      return device;

      //      return s.itemize();
    });
  }
}
