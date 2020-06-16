exports.up = async function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.string("siret").unique();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("siret");
  });
};
