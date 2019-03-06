exports.up = function(knex, Promise) {
    return knex.schema.alterTable("mandataires", function(table) {
        table.dateTime("email_send");
    });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};