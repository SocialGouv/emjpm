exports.up = async function(knex) {
  return knex.schema
    .alterTable("services", function(table) {
      table.float("latitude");
      table.float("longitude");
    })
    .alterTable("mandataires", function(table) {
      table.float("latitude");
      table.float("longitude");
    })
    .alterTable("mesures", function(table) {
      table.float("latitude");
      table.float("longitude");
    })
    .alterTable("geolocalisation_code_postal", function(table) {
      table.dropColumn("cities");
      table.string("insee");
    })
    .alterTable("geolocalisation_code_postal", function(table) {
      table.string("cities");
    });
};

exports.down = function(knex) {
  return knex.schema.alterTable("services", function(table) {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
};
