exports.up = function(knex, Promise) {
    return knex.schema.dropTable('services_sieges')
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
