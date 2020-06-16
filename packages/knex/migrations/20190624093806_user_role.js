exports.up = function (knex) {
  return knex.schema.createTable("user_role", (table) => {
    table.increments("id").primary();
    table
      .integer("role_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("role");
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_role");
};
