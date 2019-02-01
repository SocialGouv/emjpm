    exports.up = (knex, Promise) => {
    return knex.schema.createTable("mandatairesEtablissements", table => {
        table.increments();
        table
            .integer("etablissement_id")
            .references("id")
            .inTable("etablissements");
        table
            .integer("mandataire_id")
            .references("id")
            .inTable("mandataires");
        table
            .timestamp("created_at")
            .notNullable()
            .defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable("mandatairesEtablissements");
};
