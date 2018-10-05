exports.up = function(knex, Promise) {
    return knex.schema.alterTable("tis", function(table) {
        table.dropColumn("admin");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable("tis", function(table) {
        table.boolean("admin");
    });
};
