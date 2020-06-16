exports.up = async (knex) => {
  await knex.schema.createTable(
    "enquete_reponses_agrements_formations",
    (table) => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());

      // agrements

      table.integer("annee_agrement").nullable();
      table.integer("nb_departements").nullable();
      table.integer("annee_debut_activite").nullable();

      // formation

      table.integer("cnc_maj_heure_formation").nullable();
      table.integer("cnc_mjpm_heure_formation").nullable();
      table.integer("cnc_maj_annee_obtention").nullable();
      table.integer("cnc_dpf_annee_obtention").nullable();
      table.integer("cnc_dpf_heure_formation").nullable();
      table.integer("cnc_mjpm_annee_obtention").nullable();
      table.boolean("cumul_delegue_service").nullable();
      table.string("cumul_delegue_service_etp").nullable();
      table.boolean("cumul_prepose").nullable();
      table.string("cumul_prepose_etp").nullable();
      table.boolean("debut_activite_avant_2009").nullable();
      table.integer("niveau_qualification").nullable();
      table.integer("niveau_qualification_secretaire_spe").nullable();
      table.boolean("secretaire_specialise").nullable();
    }
  );
};

exports.down = async (knex) => {
  await knex.raw("DROP TABLE enquete_reponses_agrements_formations");
};
