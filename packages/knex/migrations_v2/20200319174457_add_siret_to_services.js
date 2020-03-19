exports.up = async function(knex) {
  await knex.schema.alterTable("services", function(table) {
    table.string("siret");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("services", function(table) {
    table.dropColumn("siret");
  });
};
