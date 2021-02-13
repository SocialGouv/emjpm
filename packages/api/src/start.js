const app = require("./server.js");
const logger = require("./utils/logger");
const { createLightship } = require("lightship");

const env = process.env.NODE_ENV || "development";
const host = "0.0.0.0";
const port = process.env.PORT || 4000;

const lightship = createLightship();

const server = app
  .listen(port, host, () => {
    lightship.signalReady();
    logger.info(`Starting ${env} server at http://${host}:${port}`);
  })
  .on("error", () => {
    lightship.shutdown();
  });

lightship.registerShutdownHandler(() => {
  server.close();
});
