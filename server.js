import express from "express";
import cors from "cors"
import { SensorManager } from "./SensorManager.js";
import { sendToWS } from "./wsclient.js";

const app = express();
const sensorManager = new SensorManager(sendToWS);

app.use(express.json());
app.use(cors())

app.get("/api/sensors", (req, res) => {
  //read list of sensors
});

app.post("/api/sensors", (req, res) => {
  // {"sensorId":"345","type":"Light","interval":"20"}
  //create sensor
  try {
    sensorManager.createSensor(req.body);
    res.status(201).send("Sensor Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/api/sensors/:id", (req, res) => {
  //delete sensors
});

app.listen(3000, () => {
  console.log("Simulator backend running on port 3000");
});
