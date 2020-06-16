const pino = require("pino");

const env = process.env.NODE_ENV || "development";
const isDev = env === "development";

const logger = pino({
  prettyPrint: isDev,
});

module.exports = logger;
