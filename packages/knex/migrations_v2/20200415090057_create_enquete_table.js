exports.up = async function(knex) {
  await knex.schema.createTable("enquetes", table => {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .string("annee")
      .unique()
      .notNullable();
    table.string("status").notNullable();
  });

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
  });
  await knex.schema.createTable("enquete_services", table => {
    table.increments();
    table
      .integer("service_id")
      .references("id")
      .inTable("services")
      .notNullable();
    table.float("nombre_postes_delegues_etp");
    table.integer("nombre_delegues");
    table.float("nombre_poste_autre_personnel_etp");
    table.integer("nombre_delegues_cnc");
    table.integer("nombre_delegues_cnc_pjm");
    table.integer("nombre_delegues_cnc_maj");
    table.integer("nombre_delegues_cnc_dpf");
    table.integer("nombre_delegues_en_formation");
    table.integer("nombre_delegues_non_formes");
  });
  await knex.schema.createTable("enquete_preposes", table => {
    table.increments();
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires")
      .notNullable();
  });

  return knex.schema.createTable("enquete_reponses", table => {
    table.increments();
    table.string("type").notNullable();
    table
      .integer("enquete_id")
      .references("id")
      .inTable("enquetes");
    table
      .integer("individuel_id")
      .references("id")
      .inTable("enquete_individuels");
    table
      .integer("service_id")
      .references("id")
      .inTable("enquete_services");
    table
      .integer("prepose_id")
      .references("id")
      .inTable("enquete_preposes");
  });
};

exports.down = async function(knex) {
  await knex.raw("DROP TABLE enquete_reponses");
  await knex.raw("DROP TABLE enquete_individuels");
  await knex.raw("DROP TABLE enquete_services");
  await knex.raw("DROP TABLE enquete_preposes");
  await knex.raw("DROP TABLE enquetes");
};
