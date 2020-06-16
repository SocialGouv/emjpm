exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.integer("service_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("service_id");
  });
};
