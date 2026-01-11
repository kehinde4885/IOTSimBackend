//MiniAPP or Router for sensor routes

import express from "express";

export function createSensorRoutes(sensorManager) {
  const router = express.Router();

  //CRUD
  //CREATE SENSOR
  router.post("/create", (req, res) => {
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
  router.get("/", (req, res) => {
    //read list of sensors
    res.json(sensorManager.listSensors());
  });

  router.get("/types", (req, res) => {
    res.json(sensorManager.getSensorTypes());
  });

  //UPDATE SENSOR
  // ===Change route name to match function
  router.post("/toggle/:id", (req, res) => {
    const { id } = req.params;

    const sensor = sensorManager.getSensor(id);

    if (!sensor) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    sensor.toggleSensor();

    res.json({ success: true });
  });

  //DELETE SENSOR
  router.delete("/:id", (req, res) => {
    //delete sensors
    sensorManager.deleteSensor(req.params.id);
    res.send("sensor deleted");
  });

  return router;
}
