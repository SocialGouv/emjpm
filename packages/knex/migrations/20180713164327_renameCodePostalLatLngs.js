exports.up = function (knex) {
  return knex.schema.renameTable(
    "codePostalLatLngs",
    "geolocalisation_code_postal"
  );
};

exports.down = function (knex) {
  return knex.schema.renameTable(
    "geolocalisation_code_postal",
    "codePostalLatLngs"
  );
};
