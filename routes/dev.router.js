import express from "express";

export function createDeviceRoutes(devManager) {
  const router = express.Router();

  router.get("/", (req, res) => {
    console.log("Getting device list");
    res.json(devManager.listDevices());
  });


  //
  router.get("/types", (req, res) => {
    res.json(devManager.getDeviceTypes());
  });

  //CREATE DEVICE
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


  //TOGGLE DEVICE POWER
  router.post("/toggleSwitch/:id", (req, res) => {
 
    const { id } = req.params;
    const device = devManager.getDevice(id)
    
       if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    device.togglePower();

    res.json({ success: true });


    
  })

   //DELETE DEVICE
  router.delete("/:id", (req, res) => {
    //delete sensors
    devManager.deleteDevice(req.params.id);
    res.send("device deleted");
  });

  return router;
}
