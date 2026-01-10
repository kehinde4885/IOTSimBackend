import express from "express";

export function createDeviceRoutes(devManager) {
  const router = express.Router();

  router.get("/", (req, res) => {
    console.log("Getting device list");
    res.json(devManager.listDevices());
  });

  router.get("/types", (req, res) => {
    res.json(devManager.getDeviceTypes());
  });

  router.post("/create", (req, res) => {
    console.log("Creating Device");

    const config = req.body;

    try {
      devManager.createDevice(config);

      res.json("success");
    } catch (error) {
      console.log(error);
    }
  });

   //DELETE DEVICE
  router.delete("/:id", (req, res) => {
    //delete sensors
    devManager.deleteDevice(req.params.id);
    res.send("device deleted");
  });

  return router;
}
