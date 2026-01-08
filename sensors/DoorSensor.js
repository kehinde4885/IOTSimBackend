import Sensor from "./Sensor";

class DoorSensor extends Sensor {
  constructor(config) {
    super({ ...config, type: "Door" });

    //open by default
    this.value = true;
  }

  getValue() {
    return this.value;
  }

  start() {
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
    //super.simulate()
  }

  update() {
    this.value = !this.value;
  }
}

export { DoorSensor };
