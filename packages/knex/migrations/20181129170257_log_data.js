exports.up = function(knex, Promise) {
  return knex.schema.createTable("logs_data", function(table) {
    table.increments();
    table.integer("user_id");
    table.string("action");
    table.string("result");
    table.dateTime("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("logs_data");
};
