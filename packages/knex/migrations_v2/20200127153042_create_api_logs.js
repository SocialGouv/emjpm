exports.up = function(knex) {
  return knex.schema.createTable("api_logs", function(table) {
    table.increments();
    table.string("request").notNullable();
    table.string("response").notNullable();
    table.string("token").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("api_logs");
};
