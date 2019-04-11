exports.up = function(knex, Promise) {
  return knex.schema.createTable("mesures", function(table) {
    table.increments("id").primary();
    table.string("code_postal");
    table.string("ville");
    table.string("etablissement");
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires");
    table.dateTime("postDate");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("mesures");
};
