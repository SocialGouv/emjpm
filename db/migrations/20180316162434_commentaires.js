exports.up = function(knex, Promise) {
  return knex.schema.createTable("commentaires", function(table) {
    table.increments("co_id").primary();
    table.text("co_comment");
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires");
    table
      .integer("ti_id")
      .references("id")
      .inTable("tis");
    table.dateTime("postDate");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("commentaires");
};
