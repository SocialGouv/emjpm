exports.up = function(knex, Promise) {
    return knex.schema.renameTable('serviceAntennes', 'service-antennes')
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
