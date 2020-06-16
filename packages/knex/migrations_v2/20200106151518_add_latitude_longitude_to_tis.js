exports.up = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.string("address");
    table.float("latitude");
    table.float("longitude");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.dropColumn("address");
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
};
