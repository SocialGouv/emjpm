exports.up = async function (knex) {
  await knex.schema.table("enquete_reponses", (table) => {
    table.integer("departement_id").references("id").inTable("departements");
  });
  return knex.raw(`
update enquete_reponses set departement_id = (select id from departements where code = '75');
  `);
};

exports.down = function (knex) {
  return knex.schema.table("enquete_reponses", (table) => {
    table.dropColumn("departement_id");
  });
};
