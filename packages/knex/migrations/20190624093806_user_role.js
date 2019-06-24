exports.up = function(knex) {
  return knex.schema.createTable("user_role", table => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("role_id")
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

exports.down = function(knex) {
  return knex.schema.dropTable("user_role");
};
