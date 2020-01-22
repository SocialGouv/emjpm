const environment = process.env.NODE_ENV || "development";
const config = require("@emjpm/knex/knexfile.js")[environment];

module.exports = require("knex")(config);
