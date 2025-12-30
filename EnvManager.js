export class EnvManager {
  constructor() {
    this.ambientTemperature = 45;
  }

  getAmbientTemperature() {
    return this.ambientTemperature;
  } 

  setAmbientTemperature(temp) {
    this.ambientTemperature = temp;
  }
}
