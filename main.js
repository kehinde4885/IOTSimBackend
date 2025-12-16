//connect to websocket server
const socket = new WebSocket("http://localhost:80");

//SensorObjects
const LightSensor = require("./LightSensor");

//
const Sensorlist = require("./sensors.json");

const sensors = [];

Sensorlist.forEach((value) => {
  if (value.type === "Light") {
    sensors.push(new LightSensor(value.sensorID));
  }
});

socket.addEventListener("open", function open() {
  let toggle = 0;
  const json = { role: "simulator" };

  //Send Identification JSON
  socket.send(JSON.stringify(json));

  //Send Simulator Updates
  // setInterval(() => {
  //   const value = toggle % 2 === 0 ? "On" : "Off";
  //   toggle++;
  //   const json = { sensorID: "1", type: "Light", value: value };
  //   socket.send(JSON.stringify(json));
  //   console.log("Sent:", json);
  // }, 2000);

  sensors.forEach((sensor) => {
    setInterval(() => {
      sensor.update();
      socket.send(JSON.stringify(sensor.toJSON()));
    }, sensor.intervalMs);
  });
});
