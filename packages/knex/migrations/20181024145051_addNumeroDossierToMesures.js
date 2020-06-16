exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.string("numero_dossier");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("numero_dossier");
  });
};
