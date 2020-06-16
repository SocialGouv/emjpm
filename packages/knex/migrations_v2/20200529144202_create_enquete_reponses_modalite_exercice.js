exports.up = async function (knex) {
  await knex.schema.createTable(
    "enquete_reponses_modalite_exercice",
    (table) => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());
      table.string("departement").nullable();
      table.string("region").nullable();
      table.string("nom").nullable();
      table.string("personnalite_juridique_etablissement").nullable();
      table.integer("activite_personne_physique").nullable();
      table.integer("activite_service").nullable();
      table.integer("etablissement_personne_morale").nullable();
      table.integer("etablissement_convention_groupement").nullable();
      table.integer("nombre_etablissements").nullable();
      table.integer("total_mesures_etablissements").nullable();
      table.jsonb("nombre_lits_journee_hospitalisation").nullable();
      table.integer("actions_information_tuteurs_familiaux").nullable();
    }
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table
      .integer("enquete_reponses_modalite_exercice_id")
      .references("id")
      .inTable("enquete_reponses_modalite_exercice");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.dropColumn("enquete_reponses_modalite_exercice_id");
  });

  await knex.schema.dropTable("enquete_reponses_modalite_exercice");
};
