exports.up = async function (knex) {
  await knex.schema.alterTable(
    "enquete_reponses_modalites_exercice",
    (table) => {
      table.string("activite_exercee_par").nullable();
      table.string("etablissements_type").nullable();

      table.dropColumn("activite_personne_physique");
      table.dropColumn("activite_service");
      table.dropColumn("etablissement_personne_morale");
      table.dropColumn("etablissement_convention_groupement");
      table.dropColumn("nombre_etablissements");
    }
  );
};

exports.down = async function (knex) {
  await knex.schema.alterTable(
    "enquete_reponses_modalites_exercice",
    (table) => {
      table.dropColumn("activite_exercee_par");
      table.dropColumn("etablissements_type");

      table.integer("activite_personne_physique").nullable();
      table.integer("activite_service").nullable();
      table.integer("etablissement_personne_morale").nullable();
      table.integer("etablissement_convention_groupement").nullable();
      table.integer("nombre_etablissements").nullable();
    }
  );
};
