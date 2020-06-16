var zipCodes = require("../postal_raw.json");

exports.seed = (knex) => {
  if (process.env.NODE_ENV === "test") {
    return Promise.resolve();
  }
  const newRows = zipCodes.map((row) => {
    return {
      code_postal: row.fields.code_postal,
      ville: row.fields.nom_de_la_commune,
      latitude: row.fields.coordonnees_gps
        ? row.fields.coordonnees_gps[0]
        : "null",
      longitude: row.fields.coordonnees_gps
        ? row.fields.coordonnees_gps[1]
        : "null",
    };
  });

  return knex.transaction((tr) => {
    return knex
      .table("city")
      .del()
      .then(() => {
        return knex.batchInsert("city", newRows).transacting(tr);
      });
  });
};
