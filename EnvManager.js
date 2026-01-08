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

  changeAmbientTemperature(change) {
    this.ambientTemperature = this.ambientTemperature + change;

   // console.log("Ambient Temp is", this.ambientTemperature);
  }
}
