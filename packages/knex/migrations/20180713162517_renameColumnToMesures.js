exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.renameColumn("postDate", "created_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.renameColumn("created_at", "postDate");
  });
};
