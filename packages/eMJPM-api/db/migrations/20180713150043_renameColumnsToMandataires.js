exports.up = function(knex, Promise) {
    return knex.schema.alterTable("mandataires", function(table) {
        table.renameColumn("disponibilite", "mesures_en_cours");
        table.renameColumn("updateMesure", "date_mesure_update");

    });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
