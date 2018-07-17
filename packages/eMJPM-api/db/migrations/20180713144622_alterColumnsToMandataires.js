exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.renameColumn("postDate", "created_at");
    table.dropColumn("service_id");
    table.dropColumn("commentaire");
    table.dropColumn("referent");
    table.dropColumn("specilite");
    table.dropColumn("capacite");
  });
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
