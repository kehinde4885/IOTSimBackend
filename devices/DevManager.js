import { DeviceRegistry } from "./DeviceRegistry.js";

export class DeviceManager {
  constructor(envManager,sendOverWebSocket) {
    this.devices = new Map();
    this.envManager = envManager;
    this.sendOverWebSocket = sendOverWebSocket;

  }

  getDevice(id) {
    return this.devices.get(id) || null;
  }

  getDeviceTypes() {
    return Object.keys(DeviceRegistry);
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

    console.log("Dev Manager starting Transmission")
    device.startTransmission();

    this.devices.set(config.deviceId, device);
  }

  deleteDevice(deviceId) {
    const device = this.devices.get(deviceId);

    if (!device) return;

    device.stop();
    this.devices.delete(deviceId);
  }

  simulateAll() {
    for (let device of this.devices.values()) {
      device.simulate();
    }
  }

  listDevices() {
    //returns an array of devices
    return [...this.devices.values()].map((device) => {
      return device.itemize();

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
      sendOverWebSocket: this.sendOverWebSocket,
      ...inject(this),
    });
  }
}
