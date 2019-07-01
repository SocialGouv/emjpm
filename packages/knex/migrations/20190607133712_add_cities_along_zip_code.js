exports.up = function(knex) {
  return knex.schema.alterTable("geolocalisation_code_postal", function(table) {
    table.dropUnique("code_postal", "codepostallatlngs_code_postal_unique");
    table.specificType("cities", "text[]");
    table.string("code_insee");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("geolocalisation_code_postal", function(table) {
    table.dropColumn("cities_id");
  });
};
