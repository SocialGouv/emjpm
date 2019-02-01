const fs = require("fs");
const path = require("path");

exports.seed = (knex, Promise) => {
  const rows = fs
    .readFileSync(path.join(__dirname, "../codePostalLatLngs.csv"))
    .toString()
    .split("\n")
    .slice(1)
    .map(row => {
      const [id, code_postal, latitude, longitude] = row.split(";");
      return {
        code_postal,
        latitude,
        longitude
      };
    });
  return knex.transaction(tr => {
    return knex
      .table("codePostalLatLngs")
      .del()
      .then(() => {
        return knex.batchInsert("codePostalLatLngs", rows).transacting(tr);
      });
  });
};
