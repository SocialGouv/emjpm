exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.renameColumn("postDate", "created_at");
    table.dropColumn("service_id");
    table.dropColumn("commentaire");
    table.dropColumn("referent");
    table.dropColumn("specilite");
    table.dropColumn("capacite");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.renameColumn("created_at", "postDate");
  });
};
