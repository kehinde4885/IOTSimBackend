const BaseSensor = require("./BaseSensor");

class LightSensor extends BaseSensor {
  constructor(sensorID, intervalMs = 2000) {
    super(sensorID, "Light", intervalMs);
    this.value = "Off";
  }

  update() {
    this.value = this.value === "On" ? "off" : "On";
  }
}
