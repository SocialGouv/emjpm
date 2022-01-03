const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile.js")[environment];

const knexConnection = require("knex")(config);

if (environment !== "test") {
  knexConnection
    .raw("SELECT 1")
    .then(() => {
      console.log("PostgreSQL connected");
    })
    .catch((e) => {
      console.error(e);
      console.error(
        "Fatal error: unable to connect to PostgreSQL, exiting ..."
      );
      process.exit(1);
    });
}

module.exports = knexConnection;
