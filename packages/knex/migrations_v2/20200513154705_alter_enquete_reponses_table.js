exports.up = async knex => {
  await knex.raw("DROP TABLE IF EXISTS enquete_reponses");

  await knex.schema.createTable("enquete_reponses", table => {
    table.timestamp("submitted_at").defaultTo(knex.fn.now());

    table
      .integer("enquete_id")
      .references("id")
      .inTable("enquetes");

    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires");

    table
      .integer("service_id")
      .references("id")
      .inTable("services");

    table
      .integer("enquete_reponses_informations_mandataire_id")
      .references("id")
      .inTable("enquete_reponses_informations_mandataire");

    table
      .integer("enquete_reponses_prestations_sociale_id")
      .references("id")
      .inTable("enquete_reponses_prestations_sociales");

    table
      .integer("enquete_reponses_agrements_formations_id")
      .references("id")
      .inTable("enquete_reponses_agrements_formations");

    table
      .integer("enquete_reponses_activite_id")
      .references("id")
      .inTable("enquete_reponses_activite");

    table
      .integer("enquete_reponses_populations_id")
      .references("id")
      .inTable("enquete_reponses_populations");
  });
};

exports.down = async knex => {
  await knex.raw("DROP TABLE IF EXISTS enquete_reponses");

  knex.schema.createTable("enquete_reponses", table => {
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

    table.timestamp("last_update").defaultTo(knex.fn.now());

    table.integer("activite_curatelle_renforcee_etablissement_debut_annee");
    table.integer("activite_curatelle_renforcee_etablissement_fin_annee");
    table.integer("activite_curatelle_renforcee_domicile_debut_annee");
    table.integer("activite_curatelle_renforcee_domicile_fin_annee");

    table.integer("activite_curatelle_simple_etablissement_debut_annee");
    table.integer("activite_curatelle_simple_etablissement_fin_annee");
    table.integer("activite_curatelle_simple_domicile_debut_annee");
    table.integer("activite_curatelle_simple_domicile_fin_annee");

    table.integer("activite_tutelle_etablissement_debut_annee");
    table.integer("activite_tutelle_etablissement_fin_annee");
    table.integer("activite_tutelle_domicile_debut_annee");
    table.integer("activite_tutelle_domicile_fin_annee");

    table.integer(
      "activite_accompagnement_judiciaire_etablissement_debut_annee"
    );
    table.integer("activite_accompagnement_judiciaire_etablissement_fin_annee");
    table.integer("activite_accompagnement_judiciaire_domicile_debut_annee");
    table.integer("activite_accompagnement_judiciaire_domicile_fin_annee");

    table.integer("activite_curatelle_biens_etablissement_debut_annee");
    table.integer("activite_curatelle_biens_etablissement_fin_annee");
    table.integer("activite_curatelle_biens_domicile_debut_annee");
    table.integer("activite_curatelle_biens_domicile_fin_annee");

    table.integer("activite_curatelle_personne_etablissement_debut_annee");
    table.integer("activite_curatelle_personne_etablissement_fin_annee");
    table.integer("activite_curatelle_personne_domicile_debut_annee");
    table.integer("activite_curatelle_personne_domicile_fin_annee");

    table.integer("activite_revisions_main_levee");
    table.integer("activite_revisions_masp");
    table.integer("activite_revisions_reconduction");
    table.integer("activite_revisions_changement");
    table.integer("activite_revisions_autre");
    table.integer("activite_sorties_main_levee");
    table.integer("activite_sorties_deces");
    table.integer("activite_sorties_masp");
    table.integer("populations_repartition_age_tutelle_homme");
    table.integer("populations_repartition_age_tutelle_femme");
    table.integer("populations_repartition_age_curatelle_homme");
    table.integer("populations_repartition_age_curatelle_femme");
    table.integer("populations_repartition_age_tpsa_homme");
    table.integer("populations_repartition_age_tpsa_femme");
    table.integer("populations_repartition_age_sauvegarde_justice_homme");
    table.integer("populations_repartition_age_sauvegarde_justice_femme");
    table.integer("populations_repartition_age_autre_homme");
    table.integer("populations_repartition_age_autre_femme");
    table.integer("populations_repartition_anciennete_tutelle_homme");
    table.integer("populations_repartition_anciennete_tutelle_femme");
    table.integer("populations_repartition_anciennete_curatelle_homme");
    table.integer("populations_repartition_anciennete_curatelle_femme");
    table.integer("populations_repartition_anciennete_tpsa_homme");
    table.integer("populations_repartition_anciennete_tpsa_femme");
    table.integer(
      "populations_repartition_anciennete_sauvegarde_justice_homme"
    );
    table.integer(
      "populations_repartition_anciennete_sauvegarde_justice_femme"
    );
    table.integer("populations_repartition_anciennete_autre_homme");
    table.integer("populations_repartition_anciennete_autre_femme");
    table.integer("populations_repartition_nature_etablissements");
    table.integer("populations_repartition_nature_services");
    table.integer("populations_repartition_nature_ehpad");
  });
};
