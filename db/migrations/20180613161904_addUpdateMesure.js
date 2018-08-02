exports.up = function(knex, Promise) {
    return knex.schema.alterTable("mandataires", function(table) {
        table.dateTime("updateMesure");
    });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
