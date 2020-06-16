exports.up = function (knex) {
  return knex.schema.createTable("editor_token_requests", function (table) {
    table.increments();
    table.string("email").notNullable();
    table.string("name");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.raw("DROP TABLE editor_token_requests");
};
