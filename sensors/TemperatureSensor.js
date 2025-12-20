import Sensor from "./Sensor.js";

class TemperatureSensor extends Sensor {
  constructor(config) {
    super({ ...config, type: "Temperature" });

    this.value = 20;
  }


  update() {
    
  }
}

export default TemperatureSensor;
