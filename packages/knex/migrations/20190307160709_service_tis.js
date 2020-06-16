exports.up = function (knex) {
  return knex.schema.createTable("service_tis", function (table) {
    table.increments("id").primary();
    table.integer("ti_id").references("id").inTable("tis");
    table.integer("mandataire_id").references("id").inTable("mandataires");
    table.dateTime("created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("service_tis");
};
