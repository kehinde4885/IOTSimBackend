import Sensor from "./Sensor.js";

class LightSensor extends Sensor {
  constructor(config) {
    super({ ...config, type: "Light" });

    //on by default
    this.value = true;
  }

  getValue() {
    return this.value;
  }

  startTransmission() {
    //override start to send immediate data on start
    //super.start();

    if (this.timer) return;

    this.timer = setInterval(() => {
      this.sendDataToWS({
        sensorId: this.sensorId,
        value: this.value,
        timestamp: Date.now(),
      });
    }, this.interval);
  }

  itemize() {
    return {
      sensorId: this.sensorId,
      type: this.type,
      interval: this.interval,
      value: this.value,
    };
  }

  simulate() {
    //toggle light state
  }

  update() {
    this.value = !this.value;
  }
}

export { LightSensor };
