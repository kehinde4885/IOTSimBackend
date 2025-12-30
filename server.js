import express from "express";
import cors from "cors";
import { EnvManager } from "./EnvManager.js";
import { SensorManager } from "./SensorManager.js";
import { sendToWS } from "./wsclient.js";

const app = express();

const envManager = new EnvManager();

const sensorManager = new SensorManager(sendToWS, envManager);

const SENSOR_TICK = 2000;

//Registering a simulation tick to update all sensors every second;
setInterval(() => {
  sensorManager.simulateAll();
}, SENSOR_TICK);

app.use(express.json());
app.use(cors());

//CRUD
//CREATE SENSOR
app.post("/api/sensors/create", (req, res) => {
  // {"sensorId":"345","type":"Light","interval":"20"}
  //create sensor
  try {
    sensorManager.createSensor(req.body);
    res.status(201).send("Sensor Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//READ ALL SENSORS-READ
app.get("/api/sensors", (req, res) => {
  //read list of sensors
  res.json(sensorManager.listSensors());
});

//UPDATE SENSOR
app.post("/api/sensors/update/:id", (req, res) => {
  const { id } = req.params;

  const sensor = sensorManager.getSensor(id);

  if (!sensor) {
    return res.status(404).json({ error: "Sensor not found" });
  }

  sensor.update();

  res.json({ success: true });
});

//DELETE SENSOR
app.delete("/api/sensors/:id", (req, res) => {
  //delete sensors
  sensorManager.deleteSensor(req.params.id);
  res.send("sensor deleted");
});

//
app.post("/api/env/update", (req, res) => {
  envManager.setAmbientTemperature(99);
});

app.listen(3000, () => {
  console.log("Simulator backend running on port 3000");
});
