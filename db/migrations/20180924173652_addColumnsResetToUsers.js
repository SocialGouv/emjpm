exports.up = function(knex, Promise) {
    return knex.schema.alterTable("users", function(table) {
        table.string("reset_password_token");
        table.string("reset_password_expires");

    });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};