class Fan {
  constructor(config) {
    console.log("Fan using Config", config);
    console.log("FAN CREATED");

    (this.id = config.id), (this.type = "FAN");
    this.isOn = true;

    //could Affect ambient temp later
  }

  simulate() {
    //This is where it would touch ambient Temp
  }

  update() {
    this.isOn = !this.isOn;
  }
}


export {Fan}