import express from "express";
import cors from "cors";
import { SensorManager } from "./SensorManager.js";
import { sendToWS } from "./wsclient.js";

const app = express();
const sensorManager = new SensorManager(sendToWS);

app.use(express.json());
app.use(cors());

app.get("/api/sensors", (req, res) => {
  //read list of sensors
  res.json(sensorManager.listSensors());
});

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

app.post("/api/sensors/update/:id", (req, res) => {
  const { id } = req.params;

  const sensor = sensorManager.getSensor(id);

  if (!sensor) {
    return res.status(404).json({ error: "Sensor not found" });
  }

  sensor.update();

  res.json({ success: true });
});



app.delete("/api/sensors/:id", (req, res) => {
  //delete sensors
  sensorManager.deleteSensor(req.params.id);
  res.send("sensor deleted");
});

app.listen(3000, () => {
  console.log("Simulator backend running on port 3000");
});
