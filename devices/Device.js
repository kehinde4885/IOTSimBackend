export default class Device {
  constructor(config) {
    this.sendDatatoWS = config.sendOverWebSocket;
    this.timer = null;
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
}
