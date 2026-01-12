import Device from "./Device.js";
import { eventBus } from "../eventBus.js";

const HVAC_MODES = {
  OFF: "OFF",
  HEAT: "HEAT",
  COOL: "COOL",
};

class HVAC extends Device {
  constructor(config) {
    super(config);
    console.log("HVAC using config", config);
    console.log("HVAC DEVICE CREATED");

    //InConfig
    this.id = config.deviceId;
    this.tempSensorId = config.tempSensorId;
    this.changeAmbientTemp = config.changeAmbientTempFunction;

    //InConfig

    this.mode = HVAC_MODES.OFF;

    this.heatingRate = 0.05;
    this.coolingRate = 0.05;
    this.tolerance = 0.5;
    this.targetTemp = 24;
    

    //EVENT LINKING
    this.tempEventHandler = this.handleTempEvent.bind(this);

    this.subscribe();
  }

  subscribe() {
    eventBus.on("Temperature:changed", this.tempEventHandler);
  }

  unsubscribe() {
    eventBus.off("Temperature:changed", this.tempEventHandler);
  }

  handleTempEvent(event) {
    const sensorId = event.sensorId;
    const value = event.value;
    const dt = event.dt

    if (!this.tempSensorId === sensorId) {
      return;
    }

    if (!this.isOn) {
      this.mode = HVAC_MODES.OFF;
  
      return;
    }

    const currentTemp = value;

    console.log(dt)
  

    // console.log("Temp sensor says", currentTemp);

    //dt is amount of time passed since last update in seconds

    //return what the hvac should do based on current temperature
    if (currentTemp > this.targetTemp + this.tolerance) {
      this.mode = HVAC_MODES.COOL;
    } else if (currentTemp < this.targetTemp - this.tolerance) {
      this.mode = HVAC_MODES.HEAT;
    } else {
      this.mode = HVAC_MODES.OFF;
    }

    //console.log("HVAC in mode:", this.mode);
    //Apply physical effect
    let change = 0;
    //return by how much the temperature should change
    if (this.mode === HVAC_MODES.HEAT) {
      change = this.heatingRate * dt;
    }
    if (this.mode === HVAC_MODES.COOL) {
      change = -this.coolingRate * dt;
    }

    //get ambient temperature and change it
    //GET env manager
    this.changeAmbientTemp(change);

    return 0; //no change
  }

  setTargetTemp(temp) {
    this.targetTemp = temp;
  }

  startTransmission() {
    this.timer = setInterval(() => {
      this.sendDatatoWS({
        category: "device",
        isOn: this.isOn,
        deviceId: this.id,
        value: this.mode,
        timestamp: Date.now(),
      });
    }, this.interval);
  }

  itemize() {
    return {
      isOn: this.isOn,
      type: this.type,
      id: this.id,
      tempSensorId: this.tempSensorId,
      targetTemp: this.targetTemp,
      mode: this.mode,
    };
  }

  simulate() {
    //CALED in HVAC SIMUL FUNCTION
  }

  stop() {
    super.stop();
    this.unsubscribe();
  }

  getmode() {
    return this.mode;
  }
}
export { HVAC };
