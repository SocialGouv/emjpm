exports.up = function (knex) {
  return knex.schema.createTable("access_tokens", function (table) {
    table.increments();
    table.integer("user_id").notNullable();
    table.string("access_token").notNullable();
    table.integer("editor_id").notNullable();
    table.string("editor_url").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("access_tokens");
};
