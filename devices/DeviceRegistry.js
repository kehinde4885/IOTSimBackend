import { HVAC } from "./Hvac.js";
import { Fan } from "./Fan.js";
import { ALARM } from "./Alarm.js";

export const DeviceRegistry = {
  HVAC: {
    class: HVAC,
    //Dependencies
    //Object Literal
    inject: (manager) => ({
      getTempSensor: (id) => manager.sensorManager.getSensor(id),
      changeAmbientTempFunction: (change) =>
        manager.envManager.changeAmbientTemperature(change),
    }),
  },

  FAN: {
    class: Fan,
    inject: () => ({}),
  },

  ALARM: {
    class: ALARM,
    inject: () => ({}),
  },
};
