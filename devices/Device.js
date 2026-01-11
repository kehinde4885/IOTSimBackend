export default class Device {
  constructor(config) {
    this.sendDatatoWS = config.sendOverWebSocket;
    this.timer = null;
    this.isOn = true;
    this.type = config.deviceType;
    this.interval = config.interval;
  }

  startTransmission() {
    //
  }

  stop() {
    //used to cleanup the interval function created
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  togglePower() {
    this.isOn = !this.isOn;
  }
}
