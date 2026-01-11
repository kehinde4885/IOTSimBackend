import Sensor from "./Sensor.js";

class TemperatureSensor extends Sensor {
  constructor(config) {
    super({ ...config, type: "Temperature" });

    this.getAmbientTemp = config.getAmbientTemp ?? 999; //Environment temperature(Target)

    this.currentTemp = config.currentTemp ?? 28;
    this.changeRate = config.changeRate ?? 0.05; //How fast it approaches ambient temperature
    this.noise = config.noise ?? 0.2; //Small random flunctuations

    this.minTemp = config.minTemp ?? 0;
    this.maxTemp = config.maxTemp ?? 100;
  }

  getValue() {
    return this.currentTemp;
  }

  startTransmission() {
    this.timer = setInterval(() => {
      this.sendDataToWS({
        sensorId: this.sensorId,
        value: this.currentTemp,
        timestamp: Date.now(),
      });
    }, this.interval);
  }

  toggleSensor() {}

  itemize() {
    return {
      sensorId: this.sensorId,
      type: this.type,
      interval: this.interval,
      value: this.currentTemp,
    };
  }

  simulate() {
    // Simulate temperature change towards ambient temperature
    const delta = this.getAmbientTemp() - this.currentTemp;
    const step = delta * this.changeRate;

    const noise = (Math.random() * 2 - 1) * this.noise;

    this.currentTemp += step + noise;

    //clamp temperature within min and max
    this.currentTemp = Math.max(
      this.minTemp,
      Math.min(this.currentTemp, this.maxTemp)
    );
  }
}

export default TemperatureSensor;
