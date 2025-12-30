import { HVAC_MODES } from "./hvacModes";

class HVAC {
  constructor({ heatingRate = 0.05, coolingRate = 0.05 , tolerance = 0.5, targetTemp = 24}) {
    console.log("HVAC DEVICE CREATED");
    this.heatingRate = heatingRate;
    this.coolingRate = coolingRate;

    this.tolerance = tolerance;
    this.targetTemp = 24;

    this.mode = HVAC_MODES.OFF;
   
  }

  setTargetTemp(temp) {
    this.targetTemp = temp;
  }


  update(currentTemp, dt) {
    
    //dt is amount of time passed since last update in seconds
    
    //return what the hvac should do based on current temperature
    if (currentTemp > this.targetTemp + this.tolerance) {
      this.mode = HVAC_MODES.COOL;
    } else if (currentTemp < this.targetTemp - this.tolerance) {
      this.mode = HVAC_MODES.HEAT;
    } else {
      this.mode = HVAC_MODES.OFF;
    }

    //Apply physical effect
    //return by how much the temperature should change
    if (this.mode === HVAC_MODES.HEAT) return this.heatingRate * dt;
    if (this.mode === HVAC_MODES.COOL) return -this.coolingRate * dt;

    return 0; //no change
  }

  getmode() {
    return this.mode;
  }
}
export { HVAC };
