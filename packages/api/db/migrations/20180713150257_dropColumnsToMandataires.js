exports.up = function(knex) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.dropColumn("curatelle");
    table.dropColumn("sauvegarde");
    table.dropColumn("curatelle_renforce");
    table.dropColumn("tribunal_instance");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
