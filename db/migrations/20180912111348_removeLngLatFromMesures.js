exports.up = function(knex, Promise) {
    return knex.schema.alterTable("mesures", function(table) {
        table.dropColumn("latitude");
        table.dropColumn("longitude");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable("mesures", function(table) {
        table.float("latitude").alter();
        table.float("longitude").alter();
    });
};
