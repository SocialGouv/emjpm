exports.up = function(knex, Promise) {
    return knex.schema.alterTable("commentaires", function(table) {
        table.renameColumn("co_id", "id");
        table.renameColumn("co_comment", "comment");
        table.renameColumn("postDate", "created_at");
    });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
