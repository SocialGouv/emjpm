exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.string("zip");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("zip");
  });
};
