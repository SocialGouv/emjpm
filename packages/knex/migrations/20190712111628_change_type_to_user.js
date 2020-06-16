exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("type").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("type", 20).alter();
  });
};
