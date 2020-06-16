exports.up = function (knex) {
  return knex.schema.alterTable("geolocalisation_code_postal", function (
    table
  ) {
    table.specificType("cities", "text[]");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("geolocalisation_code_postal", function (
    table
  ) {
    table.dropColumn("cities");
  });
};
