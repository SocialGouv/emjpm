exports.up = function(knex, Promise) {
  return knex.schema.alterTable("codepostallatlngs", function(table) {
    table
      .integer("cities_id")
      .references("id")
      .inTable("cities");
    table.dropUnique("code_postal");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("geolocalisation_code_postal", function(table) {
    table.dropColumn("cities_id");
  });
};
