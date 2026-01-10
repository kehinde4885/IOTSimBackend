import Device from "./Device.js";

class Fan extends Device {
  constructor(config) {
    super(config)
    console.log("Fan using Config", config);
    console.log("FAN CREATED");

    this.id = config.deviceId, 
    this.type = "FAN"
    this.isOn = true;
    this.interval = config.interval;

    //could Affect ambient temp later
  }

  startTransmission() {
    this.timer = setInterval(() => {
      this.sendDatatoWS({
        category: "device",
        deviceId: this.id,
        value: this.isOn,
        timestamp: Date.now()
      })
    },this.interval)
  }

  itemize() {
    return {
      id: this.id,
      isOn: this.isOn,
      type: this.type,
      interval: this.interval
    }
  }

  simulate() {
    //This is where it would touch ambient Temp
  }

  update() {
    this.isOn = !this.isOn;
  }
}

export { Fan };
