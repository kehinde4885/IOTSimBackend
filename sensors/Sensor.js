class Sensor {
  constructor({ sensorId, type, interval, sendDataToWS }) {
    //InConfig
    this.sendDataToWS = sendDataToWS;
    this.sensorId = sensorId;
    this.interval = interval;
    this.type = type;
    //InConfig
    this.timer = null;
    this.value = null;
  }

  start() {
    if (this.timer) return;

    this.timer = setInterval(() => {
      const value = this.update();

      this.sendData({
        sensorId: this.sensorId,
        value,
        timestamp: Date.now(),
      });
    }, this.interval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  update() {
    //overriden in child subclass
  }
}

class LightSensor extends Sensor {
  constructor(config) {
    super({ ...config, type: "Light" });

    //on by default
    this.value = "On";
  }

  update() {
    this.value = this.value === "On" ? "off" : "On";
  }
}

export {LightSensor}
