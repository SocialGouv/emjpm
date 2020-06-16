exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.renameColumn("zip", "competences");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.renameColumn("competences", "zip");
  });
};
