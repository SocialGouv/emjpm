exports.up = function (knex) {
  return knex.schema.alterTable("serviceAntennes", function (table) {
    table.renameColumn("disponibilite", "mesures_en_cours");
    table.renameColumn("service_id", "mandataire_id");
    table.dateTime("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("serviceAntennes", function (table) {
    table.renameColumn("mesures_en_cours", "disponibilite");
    table.renameColumn("mandataire_id", "service_id");
  });
};
