import Sensor from "./Sensor.js";

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