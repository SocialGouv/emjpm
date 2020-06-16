exports.up = (knex) => {
  return knex.schema.alterTable("enquete_reponses", (table) => {
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

exports.down = (knex) => {
  knex.schema.alterTable("enquete_reponses", (table) => {
    table.dropColumn("last_update");

    table.dropColumn("activite_curatelle_renforcee_etablissement_debut_annee");
    table.dropColumn("activite_curatelle_renforcee_etablissement_fin_annee");
    table.dropColumn("activite_curatelle_renforcee_domicile_debut_annee");
    table.dropColumn("activite_curatelle_renforcee_domicile_fin_annee");
    table.dropColumn("activite_curatelle_simple_etablissement_debut_annee");
    table.dropColumn("activite_curatelle_simple_etablissement_fin_annee");
    table.dropColumn("activite_curatelle_simple_domicile_debut_annee");
    table.dropColumn("activite_curatelle_simple_domicile_fin_annee");

    table.dropColumn("activite_tutelle_etablissement_debut_annee");
    table.dropColumn("activite_tutelle_etablissement_fin_annee");
    table.dropColumn("activite_tutelle_domicile_debut_annee");
    table.dropColumn("activite_tutelle_domicile_fin_annee");

    table.dropColumn(
      "activite_accompagnement_judiciaire_etablissement_debut_annee"
    );
    table.dropColumn(
      "activite_accompagnement_judiciaire_etablissement_fin_annee"
    );
    table.dropColumn("activite_accompagnement_judiciaire_domicile_debut_annee");
    table.dropColumn("activite_accompagnement_judiciaire_domicile_fin_annee");

    table.dropColumn("activite_curatelle_biens_etablissement_debut_annee");
    table.dropColumn("activite_curatelle_biens_etablissement_fin_annee");
    table.dropColumn("activite_curatelle_biens_domicile_debut_annee");
    table.dropColumn("activite_curatelle_biens_domicile_fin_annee");

    table.dropColumn("activite_curatelle_personne_etablissement_debut_annee");
    table.dropColumn("activite_curatelle_personne_etablissement_fin_annee");
    table.dropColumn("activite_curatelle_personne_domicile_debut_annee");
    table.dropColumn("activite_curatelle_personne_domicile_fin_annee");

    table.dropColumn("activite_revisions_main_levee");
    table.dropColumn("activite_revisions_masp");
    table.dropColumn("activite_revisions_reconduction");
    table.dropColumn("activite_revisions_changement");
    table.dropColumn("activite_revisions_autre");
    table.dropColumn("activite_sorties_main_levee");
    table.dropColumn("activite_sorties_deces");
    table.dropColumn("activite_sorties_masp");

    table.dropColumn("populations_repartition_age_tutelle_homme");
    table.dropColumn("populations_repartition_age_tutelle_femme");
    table.dropColumn("populations_repartition_age_curatelle_homme");
    table.dropColumn("populations_repartition_age_curatelle_femme");
    table.dropColumn("populations_repartition_age_tpsa_homme");
    table.dropColumn("populations_repartition_age_tpsa_femme");
    table.dropColumn("populations_repartition_age_sauvegarde_justice_homme");
    table.dropColumn("populations_repartition_age_sauvegarde_justice_femme");
    table.dropColumn("populations_repartition_age_autre_homme");
    table.dropColumn("populations_repartition_age_autre_femme");

    table.dropColumn("populations_repartition_anciennete_tutelle_homme");
    table.dropColumn("populations_repartition_anciennete_tutelle_femme");
    table.dropColumn("populations_repartition_anciennete_curatelle_homme");
    table.dropColumn("populations_repartition_anciennete_curatelle_femme");
    table.dropColumn("populations_repartition_anciennete_tpsa_homme");
    table.dropColumn("populations_repartition_anciennete_tpsa_femme");
    table.dropColumn(
      "populations_repartition_anciennete_sauvegarde_justice_homme"
    );
    table.dropColumn(
      "populations_repartition_anciennete_sauvegarde_justice_femme"
    );
    table.dropColumn("populations_repartition_anciennete_autre_homme");
    table.dropColumn("populations_repartition_anciennete_autre_femme");

    table.dropColumn("populations_repartition_nature_etablissements");
    table.dropColumn("populations_repartition_nature_services");
    table.dropColumn("populations_repartition_nature_ehpad");
  });
};
