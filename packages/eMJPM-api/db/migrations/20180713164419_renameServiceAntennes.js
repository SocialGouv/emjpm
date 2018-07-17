exports.up = function(knex, Promise) {
    return knex.schema.renameTable('serviceAntennes', 'service_antennes')
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
