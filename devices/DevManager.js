import { DeviceRegistry } from "./DeviceRegistry.js";

export class DeviceManager {
  constructor(envManager, sensorManager) {
    this.devices = new Map();
    this.envManager = envManager;
    this.sensorManager = sensorManager;

    // console.log(this.sensorManager);
    // console.log(sensorManager);
  }

  getDeviceTypes() {
    return Object.keys(DeviceRegistry)
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

    let device = this.helpCreateDevice(config);

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

  helpCreateDevice(config) {
    const entry = DeviceRegistry[config.deviceType];

    if (!entry) {
      throw new Error(`Unknown Device Type: ${config.deviceType}`);
    }

    const { class: DeviceClass, inject } = entry;

    return new DeviceClass({
      ...config,
      ...inject(this),
      // getTempSensor: (id) => this.sensorManager.getSensor(id),
      // changeAmbientTempFunction: (change) =>
      //   this.envManager.changeAmbientTemperature(change),
    });
  }
}
