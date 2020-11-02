const app = require("./server.js");
const logger = require("./utils/logger");

const env = process.env.NODE_ENV || "development";
const host = "0.0.0.0";
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
  logger.info(`Starting ${env} server at http://${host}:${port}`);
});
