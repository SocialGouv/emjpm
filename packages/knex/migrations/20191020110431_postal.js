const zipCodes = require("../seeds/postal_raw.json");

exports.up = async function(knex) {
  const newRows = zipCodes.map(row => {
    let lat = 48.8534;
    let long = 2.3488;
    if (row.fields.coordonnees_gps) {
      const coord = row.fields.coordonnees_gps;
      lat = coord[0];
      long = coord[1];
    }
    return {
      insee: row.fields.code_commune_insee,
      code_postal: row.fields.code_postal,
      latitude: lat,
      longitude: long,
      cities: row.fields.nom_de_la_commune
    };
  });
  return knex.transaction(tr => {
    return knex
      .table("geolocalisation_code_postal")
      .del()
      .then(() => {
        return knex
          .batchInsert(
            "geolocalisation_code_postal",
            removeUnique(newRows, "code_postal")
          )
          .transacting(tr);
      });
  });
};

exports.down = function() {};

function removeUnique(arr, key) {
  const unique = arr
    .map(e => e[key])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
}
