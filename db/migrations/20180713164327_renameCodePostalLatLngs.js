exports.up = function(knex, Promise) {
  return knex.schema.renameTable(
    "codePostalLatLngs",
    "geolocalisation_code_postal"
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable(
    "geolocalisation_code_postal",
    "codePostalLatLngs"
  );
};
