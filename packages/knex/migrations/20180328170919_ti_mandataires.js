exports.up = function (knex) {
  return knex.schema.createTable("mandatairetis", function (table) {
    table.increments("id").primary();
    table.integer("ti_id").references("id").inTable("tis");
    table.integer("mandataire_id").references("id").inTable("mandataires");
    table.dateTime("postDate");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("mandatairetis");
};
