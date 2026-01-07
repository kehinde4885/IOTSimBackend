import express from "express";

export function createDeviceRoutes(devManager) {
  const router = express.Router();

  router.get("/", (req, res) => {
    console.log("Getting device list");
    res.json(devManager.listDevices());
  });

  router.post("/create", (req, res) => {
    console.log("Creating Device");

    const config = req.body;

    try {
      devManager.createDevice(config);
    } catch (error) {
      console.log(error);
    }
  });

  return router;
}
