exports.up = function(knex, Promise) {
    return knex.schema.alterTable("serviceAntennes", function(table) {
        table.renameColumn("disponibilite", "mesures_en_cours");
        table.renameColumn("service_id", "mandataire_id");
        table.dateTime("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
