exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.string("numero_rg");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("numero_rg");
  });
};
