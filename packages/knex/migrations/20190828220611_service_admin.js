exports.up = function (knex) {
  return knex.schema.createTable("service_admin", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");
    table
      .integer("service_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("services");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("service_admin");
};
