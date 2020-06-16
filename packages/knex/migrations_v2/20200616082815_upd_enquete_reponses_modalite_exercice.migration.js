exports.up = async function(knex) {
  await knex.schema.alterTable("enquete_reponses_modalites_exercice", table => {
    table
      .boolean("actions_information_tuteurs_familiaux")
      .nullable()
      .alter();
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("enquete_reponses_modalites_exercice", table => {
    table
      .integer("actions_information_tuteurs_familiaux")
      .nullable()
      .alter();
  });
};
