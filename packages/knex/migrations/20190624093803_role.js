exports.up = function (knex) {
  return knex.schema.createTable("role", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("role");
};
