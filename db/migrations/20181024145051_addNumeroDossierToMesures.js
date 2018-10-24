exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.string("numero_dossier");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.dropColumn("numero_dossier");
  });
};
