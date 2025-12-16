class BaseSensor {
  constructor(sensorID, type, intervalMs) {
    this.sensorID = sensorID;
    this.type = type;
    this.intervalMs = intervalMs;
    this.value = null;
  }

  update() {
    //to be overriden in children subclasses
  }

  toJSON() {
    return {
      sensorID: this.sensorID,
      type: this.type,
      value: this.value,
    };
  }
}

module.exports = BaseSensor;
