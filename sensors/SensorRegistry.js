import TemperatureSensor from "./TemperatureSensor.js";
import { LightSensor } from "./LightSensor.js";
import { DoorSensor } from "./DoorSensor.js";

//SensorRegistry Object
export const SensorRegistry = {
  //Key:Value
  Light: {
    class: LightSensor,
    //inject contains a function that
    //returns an object literal / Object
    inject: () => ({}),
  },

  Temperature: {
    //what type is class value??
    class: TemperatureSensor,
    //inject contains a function that
    //returns an object literal / Object
    inject: (manager) => ({
      getAmbientTemp: () => manager.envManager.getAmbientTemperature(),
    }),
  },

  Door: {
    class: DoorSensor,
    inject: () => ({}),
  },
};
