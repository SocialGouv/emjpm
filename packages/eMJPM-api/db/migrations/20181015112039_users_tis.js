exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_tis", function(table) {
    table.increments("id").primary();
    table
      .integer("ti_id")
      .references("id")
      .inTable("tis");
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
    table.string("email");
    table.string("cabinet");
    table.dateTime("creates_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users_tis");
};
