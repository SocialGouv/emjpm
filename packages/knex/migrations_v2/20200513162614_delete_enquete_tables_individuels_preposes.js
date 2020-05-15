exports.up = async function(knex) {
  await knex.raw("DROP TABLE IF EXISTS enquete_individuels");
  await knex.raw("DROP TABLE IF EXISTS enquete_preposes");
};

exports.down = async function(knex) {
  await knex.schema.createTable("enquete_individuels", table => {
    table.increments();
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires")
      .notNullable();

    table.string("estimation_etp");
    table.boolean("secretaire_specialise");
    table.string("secretaire_specialise_etp");
    table.boolean("cumul_prepose");
    table.string("cumul_prepose_etp");
    table.boolean("cumul_delegue_service");
    table.string("cumul_delegue_service_etp");

    table.boolean("debut_activite_avant_2009");
    table.integer("annee_debut_activite");
    table.integer("annee_agrement");

    table.integer("cnc_mjpm_annee_obtention");
    table.integer("cnc_mjpm_heure_formation");
    table.integer("cnc_maj_annee_obtention");
    table.integer("cnc_maj_heure_formation");
    table.integer("cnc_dpf_annee_obtention");
    table.integer("cnc_dpf_heure_formation");
    table.integer("niveau_qualification");
    table.integer("niveau_qualification_secretaire_spe");

    table.integer("ps_aah").nullable();
    table.integer("ps_pch").nullable();
    table.integer("ps_asi").nullable();
    table.integer("ps_rsa").nullable();
    table.integer("ps_als_apl").nullable();
    table.integer("ps_aspa").nullable();
    table.integer("ps_apa").nullable();
  });
  await knex.schema.createTable("enquete_preposes", table => {
    table.increments();
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires")
      .notNullable();
  });
};
