exports.up = function (knex) {
  return knex.schema.alterTable("commentaires", function (table) {
    table.renameColumn("co_id", "id");
    table.renameColumn("co_comment", "comment");
    table.renameColumn("postDate", "created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("commentaires", function (table) {
    table.renameColumn("id", "co_id");
    table.renameColumn("comment", "co_comment");
    table.renameColumn("created_at", "postDate");
  });
};
