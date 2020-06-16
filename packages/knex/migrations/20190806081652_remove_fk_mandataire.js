exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropForeign("antenne_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.foreign("antenne_id").references("id").inTable("service_antenne");
  });
};
