exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.float("latitude");
    table.float("longitude");
  });
};
