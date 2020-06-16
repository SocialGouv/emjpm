exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.string("reason_extinction");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("reason_extinction");
  });
};
