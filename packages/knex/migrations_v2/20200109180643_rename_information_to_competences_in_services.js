exports.up = function (knex) {
  return knex.schema.alterTable("services", function (table) {
    table.renameColumn("information", "competences");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("services", function (table) {
    table.renameColumn("competences", "information");
  });
};
