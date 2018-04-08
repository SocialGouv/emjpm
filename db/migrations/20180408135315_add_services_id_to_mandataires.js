exports.up = function(knex, Promise) {
    return knex.schema.alterTable('mandataires', function(table) {
        table.integer('service_id');
    });
};

exports.down = function(knex, Promise) {
};