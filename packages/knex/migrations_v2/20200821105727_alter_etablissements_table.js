exports.up = async function (knex) {
  await knex.schema.alterTable("etablissements", (table) => {
    table.integer("departement_id").references("id").inTable("departements");
  });
};

exports.down = function (knex) {
  return knex.schema.table("etablissements", (table) => {
    table.dropColumn("departement_id");
  });
};
