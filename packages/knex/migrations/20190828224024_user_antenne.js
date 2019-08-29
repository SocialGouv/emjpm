exports.up = function(knex) {
  return knex.schema.createTable("user_antenne", table => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");
    table
      .integer("antenne_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("service_antenne");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user_antenne");
};
