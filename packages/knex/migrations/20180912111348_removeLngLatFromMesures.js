exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.float("latitude");
    table.float("longitude");
  });
};
