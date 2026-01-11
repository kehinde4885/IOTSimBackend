import Sensor from "./Sensor.js";

export default class SmokeSensor extends Sensor {
  constructor(config) {
    super({ ...config, type: "Smoke" });

    this.isSmoke = false;
  }

  getValue() {
    return this.isSmoke;
  }

  startTransmission() {
    if (this.timer) return;

    this.timer = setInterval(() => {
      this.sendDataToWS({
        category: "sensor",
        sensorId: this.sensorId,
        value: this.isSmoke,
        timestamp: Date.now(),
      });
    }, this.interval);
  }

  itemize() {
    return {
      sensorId: this.sensorId,
      type: this.type,
      interval: this.interval,
      value: this.isSmoke,
    };
  }

  simulate() {
    
  }

  toggleSensor() {
    this.isSmoke = !this.isSmoke
  }
}
