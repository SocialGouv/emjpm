const dotenv = require("dotenv");
const { getConfiguration } = require("./configuration");

dotenv.config({ path: "../../.env" });

module.exports = getConfiguration(process.env);
