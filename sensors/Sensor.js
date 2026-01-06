export default class Sensor {
  constructor({ sensorId, type, interval, sendData }) {
    //InConfig
    this.sendDataToWS = sendData;
    this.sensorId = sensorId;
    this.interval = interval;
    this.type = type;
    //InConfig
    this.timer = null;

    console.log("BASE SENSOR CLASS SAYS:SENSOR CREATED");
  }

  getValue() {
    //used to get the value of sensor
  }

  start() {
    //used to send updates to the websocket server
    //override in child subclass
  }

  stop() {
    //used to cleanup the interval function created
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  itemize() {
    //return basic info about the sensor
  }

  update() {
    //overriden in child subclass``
  }

  simulate() {
    //overriden in child subclass
    console.log("BASE SENSOR CLASS SIMULATE METHOD CALLED");
  }
}
