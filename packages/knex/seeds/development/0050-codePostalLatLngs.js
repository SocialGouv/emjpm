const fs = require("fs");
const path = require("path");

exports.seed = knex => {
  const rows = fs
    .readFileSync(path.join(__dirname, "../codePostalLatLngs.csv"))
    .toString()
    .split("\n")
    .slice(1)
    .map(row => {
      const [code_postal, latitude, longitude] = row.split(";");
      return {
        code_postal,
        latitude,
        longitude
      };
    });
  return knex.transaction(tr => {
    return knex
      .table("geolocalisation_code_postal")
      .del()
      .then(() => {
        return knex
          .batchInsert("geolocalisation_code_postal", rows)
          .transacting(tr);
      });
  });
};
