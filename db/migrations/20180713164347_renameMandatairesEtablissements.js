exports.up = function(knex, Promise) {
    return knex.schema.renameTable('mandatairesEtablissements', 'mandataire_etablissements')
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};