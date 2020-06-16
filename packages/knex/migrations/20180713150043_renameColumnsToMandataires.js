exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.renameColumn("disponibilite", "mesures_en_cours");
    table.renameColumn("updateMesure", "date_mesure_update");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.renameColumn("mesures_en_cours", "disponibilite");
    table.renameColumn("date_mesure_update", "updateMesure");
  });
};
