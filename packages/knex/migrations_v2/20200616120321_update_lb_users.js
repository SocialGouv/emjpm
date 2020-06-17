exports.up = function (knex) {
  return knex.schema.alterTable("lb_users", function (table) {
    table.unique("email");
    table.unique("user_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("lb_users", function (table) {
    table.dropUnique("email");
    table.dropUnique("user_id");
  });
};
