exports.up = function(knex) {
  return knex.schema.createTable("api_logs", function(table) {
    table.increments();
    table
      .integer("editor_id")
      .references("id")
      .inTable("editors");
    table.string("token", 1200);
    table.jsonb("request");
    table.jsonb("response");
    table.dateTime("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("api_logs");
};
