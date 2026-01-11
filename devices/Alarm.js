import Device from "./Device.js";

class ALARM extends Device {
  constructor(config) {
    super(config);

    console.log("ALARM using config", config);
    console.log("ALARM BEEPER CREATED");

    this.id = config.deviceId;
  }

  startTransmission() {
    this.timer = setInterval(() => {
      this.sendDatatoWS({
        category: "device",
        deviceId: this.id,
        value: this.isOn,
        timestamp: Date.now(),
      });
    }, this.interval);
  }

  itemize() {
    return {
      id: this.id,
      isOn: this.isOn,
      type: this.type,
      interval: this.interval,
    };
  }

  simulate() {
    //Alam sensor does not
    //really need simulate does it?
  }
}

export { ALARM };
