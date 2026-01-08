import express from "express";
import cors from "cors";
import { EnvManager } from "./EnvManager.js";
import { SensorManager } from "./SensorManager.js";
import { sendOverWebSocket } from "./wsclient.js";
import { createSensorRoutes } from "./routes/sensors.routes.js";
import { createEnvRoutes } from "./routes/env.router.js";
import { createDeviceRoutes } from "./routes/dev.router.js";
import { DeviceManager } from "./devices/DevManager.js";
import { startDeviceSimulation, startSensorSimulation } from "./simulations.js";

const app = express();

const envManager = new EnvManager();

const sensorManager = new SensorManager(sendOverWebSocket, envManager);

const devManager = new DeviceManager(envManager, sensorManager);

//START SIMULATIONS
startSensorSimulation(sensorManager);

startDeviceSimulation(devManager)

//

app.use(express.json());
app.use(cors());


//at this path, mount this router(function returns a router)
app.use("/api/sensors", createSensorRoutes(sensorManager));

app.use("/api/env", createEnvRoutes(envManager));

app.use("/api/devices", createDeviceRoutes(devManager));

app.listen(3000, () => {
  console.log("Simulator backend running on port 3000");
});
