const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile.js")[environment];

const knexConnection = require("knex")(config);

const { Model } = require("objection");

Model.knex(knexConnection);

knexConnection
  .raw("SELECT 1")
  .then(() => {
    console.log("PostgreSQL connected");
  })
  .catch((e) => {
    console.log("PostgreSQL not connected");
    console.error(e);
  });

module.exports = knexConnection;
