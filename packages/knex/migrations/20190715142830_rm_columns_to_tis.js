exports.up = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
    table.dropColumn("user_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.float("latitude");
    table.float("longitude");
    table.integer("user_id");
  });
};
