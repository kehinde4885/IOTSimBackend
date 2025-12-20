export default class Sensor {
  constructor({ sensorId, type, interval, sendData }) {
    //InConfig
    this.sendDataToWS = sendData;
    this.sensorId = sensorId;
    this.interval = interval;
    this.type = type;
    //InConfig
    this.timer = null;
    this.value = null;

    console.log("SENSOR CLASS SAYS:SENSOR CREATED");
  }

  start() {
    //used to send updates to the websocket server
    if (this.timer) return;

    this.timer = setInterval(() => {
      this.sendDataToWS({
        sensorId: this.sensorId,
        value: this.value,
        timestamp: Date.now(),
      });
    }, this.interval);
  }

  stop() {
    //used to cleanup the interval function created
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  update() {
    //overriden in child subclass
  }
}



