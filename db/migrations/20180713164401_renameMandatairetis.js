exports.up = function(knex, Promise) {
    return knex.schema.renameTable('mandatairetis', 'mandataire_tis')
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};