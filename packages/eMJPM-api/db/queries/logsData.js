const knex = require("../knex.js");

const addDataLogs = data => knex("logs_data").insert(data);

module.exports = {
  addDataLogs
};
