const SENSOR_TICK = 2000;
const DEVICE_TICK = 1000;

function startSensorSimulation(sensorManager) {
  return setInterval(() => {
    sensorManager.simulateAll();
  }, SENSOR_TICK);
}


function startDeviceSimulation() {

  


}

export {startSensorSimulation}