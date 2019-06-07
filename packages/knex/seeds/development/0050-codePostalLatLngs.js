var zipCodes = require("../postal.json");

exports.seed = knex => {
  const newRows = zipCodes.map(row => {
    return {
      code_postal: row.fields.code_postal,
      latitude: row.fields.coordonnees_gps[0],
      longitude: row.fields.coordonnees_gps[1]
    };
  });
  return knex.transaction(tr => {
    return knex
      .table("geolocalisation_code_postal")
      .del()
      .then(() => {
        return knex
          .batchInsert("geolocalisation_code_postal", newRows)
          .transacting(tr);
      });
  });
};
