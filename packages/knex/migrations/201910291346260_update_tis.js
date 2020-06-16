exports.up = async function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.string("siret").unique();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.dropColumn("siret");
  });
};
