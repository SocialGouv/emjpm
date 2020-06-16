exports.up = function (knex) {
  return knex.schema.createTable("editors", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("api_token").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("editors");
};
