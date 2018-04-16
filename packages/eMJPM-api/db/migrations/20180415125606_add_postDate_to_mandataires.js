exports.up = function(knex, Promise) {
    return knex.schema.alterTable('mandataires', function(table) {
        table.dateTime('postDate').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};