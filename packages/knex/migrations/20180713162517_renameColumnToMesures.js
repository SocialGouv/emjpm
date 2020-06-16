exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.renameColumn("postDate", "created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.renameColumn("created_at", "postDate");
  });
};
