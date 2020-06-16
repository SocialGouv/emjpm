exports.up = async function (knex) {
  return knex.schema.alterTable("commentaires", function (table) {
    table.integer("antenne_id");
    table.foreign("antenne_id").references("id").inTable("service_antenne");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("commentaires", function (table) {
    table.dropColumn("antenne_id");
  });
};
