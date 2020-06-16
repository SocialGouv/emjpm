exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.string("cabinet");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("cabinet");
  });
};
