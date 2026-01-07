//MiniAPP or Router for sensor routes

import express from "express";

export function createEnvRoutes(envManager) {
  const router = express.Router();


  router.get("/", (req, res) => {
   
  })

  router.post("/update", (req, res) => {
    envManager.setAmbientTemperature(99);
  });

  return router;
}
