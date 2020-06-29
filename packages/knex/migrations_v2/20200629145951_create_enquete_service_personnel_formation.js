exports.up = async function (knex) {
  await knex.schema.createTable(
    "enquete_service_personnel_formation",
    (table) => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());

      table.integer("nb_delegues_debut_annee").nullable();
      table.integer("nb_delegues_fin_annee").nullable();

      table.integer("nb_delegues_cnc").nullable();
      table.integer("nb_delegues_en_formation").nullable();
      table.float("total_heures_delegues_en_formation").nullable();
      table.integer("nb_delegues_non_formes").nullable();

      table.integer("nb_delegues_niveau1").nullable();
      table.float("nb_delegues_niveau1_etp").nullable();
      table.integer("nb_delegues_niveau2").nullable();
      table.float("nb_delegues_niveau2_etp").nullable();
      table.integer("nb_delegues_niveau3").nullable();
      table.float("nb_delegues_niveau3_etp").nullable();
      table.integer("nb_delegues_niveau4").nullable();
      table.float("nb_delegues_niveau4_etp").nullable();
      table.integer("nb_delegues_niveau5").nullable();
      table.float("nb_delegues_niveau5_etp").nullable();
      table.integer("nb_delegues_niveau6").nullable();
      table.float("nb_delegues_niveau6_etp").nullable();

      table.integer("nb_delegues_homme").nullable();
      table.float("nb_delegues_homme_etp").nullable();
      table.integer("nb_delegues_femme").nullable();
      table.float("nb_delegues_femme_etp").nullable();
    }
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table
      .integer("enquete_service_personnel_formation_id")
      .references("id")
      .inTable("enquete_service_personnel_formation");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.dropColumn("enquete_service_personnel_formation_id");
  });

  await knex.schema.dropTable("enquete_service_personnel_formation");
};
