exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.string("numero_rg");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.dropColumn("numero_rg");
  });
};
