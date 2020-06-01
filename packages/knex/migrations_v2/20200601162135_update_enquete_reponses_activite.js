exports.up = function(knex) {
  return knex.schema.alterTable("enquete_reponses_activite", function(table) {
    table.integer("curatelle_renforcee_etablissement_mesures_nouvelles");
    table.integer("curatelle_renforcee_etablissement_sortie_mesures");
    table.integer("curatelle_renforcee_domicile_mesures_nouvelles");
    table.integer("curatelle_renforcee_domicile_sortie_mesures");

    table.integer("curatelle_simple_etablissement_mesures_nouvelles");
    table.integer("curatelle_simple_etablissement_sortie_mesures");
    table.integer("curatelle_simple_domicile_mesures_nouvelles");
    table.integer("curatelle_simple_domicile_sortie_mesures");

    table.integer("tutelle_etablissement_mesures_nouvelles");
    table.integer("tutelle_etablissement_sortie_mesures");
    table.integer("tutelle_domicile_mesures_nouvelles");
    table.integer("tutelle_domicile_sortie_mesures");

    table.integer("accompagnement_judiciaire_etablissement_mesures_nouvelles");
    table.integer("accompagnement_judiciaire_etablissement_sortie_mesures");
    table.integer("accompagnement_judiciaire_domicile_mesures_nouvelles");
    table.integer("accompagnement_judiciaire_domicile_sortie_mesures");

    table.integer("curatelle_biens_etablissement_mesures_nouvelles");
    table.integer("curatelle_biens_etablissement_sortie_mesures");
    table.integer("curatelle_biens_domicile_mesures_nouvelles");
    table.integer("curatelle_biens_domicile_sortie_mesures");

    table.integer("curatelle_personne_etablissement_mesures_nouvelles");
    table.integer("curatelle_personne_etablissement_sortie_mesures");
    table.integer("curatelle_personne_domicile_mesures_nouvelles");
    table.integer("curatelle_personne_domicile_sortie_mesures");

    table.integer("subroge_tuteur_createur_debut_annee");
    table.integer("subroge_tuteur_createur_mesures_nouvelles");
    table.integer("subroge_tuteur_createur_sortie_mesures");
    table.integer("subroge_tuteur_createur_fin_annee");

    table.integer("sauvegarde_justice_debut_annee");
    table.integer("sauvegarde_justice_mesures_nouvelles");
    table.integer("sauvegarde_justice_sortie_mesures");
    table.integer("sauvegarde_justice_fin_annee");

    table.integer("mandat_adhoc_majeur_debut_annee");
    table.integer("mandat_adhoc_majeur_mesures_nouvelles");
    table.integer("mandat_adhoc_majeur_sortie_mesures");
    table.integer("mandat_adhoc_majeur_fin_annee");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("enquete_reponses_activite", function(table) {
    table.dropColumn("curatelle_renforcee_etablissement_mesures_nouvelles");
    table.dropColumn("curatelle_renforcee_etablissement_sortie_mesures");
    table.dropColumn("curatelle_renforcee_domicile_mesures_nouvelles");
    table.dropColumn("curatelle_renforcee_domicile_sortie_mesures");

    table.dropColumn("curatelle_simple_etablissement_mesures_nouvelles");
    table.dropColumn("curatelle_simple_etablissement_sortie_mesures");
    table.dropColumn("curatelle_simple_domicile_mesures_nouvelles");
    table.dropColumn("curatelle_simple_domicile_sortie_mesures");

    table.dropColumn("tutelle_etablissement_mesures_nouvelles");
    table.dropColumn("tutelle_etablissement_sortie_mesures");
    table.dropColumn("tutelle_domicile_mesures_nouvelles");
    table.dropColumn("tutelle_domicile_sortie_mesures");

    table.dropColumn(
      "accompagnement_judiciaire_etablissement_mesures_nouvelles"
    );
    table.dropColumn("accompagnement_judiciaire_etablissement_sortie_mesures");
    table.dropColumn("accompagnement_judiciaire_domicile_mesures_nouvelles");
    table.dropColumn("accompagnement_judiciaire_domicile_sortie_mesures");

    table.dropColumn("curatelle_biens_etablissement_mesures_nouvelles");
    table.dropColumn("curatelle_biens_etablissement_sortie_mesures");
    table.dropColumn("curatelle_biens_domicile_mesures_nouvelles");
    table.dropColumn("curatelle_biens_domicile_sortie_mesures");

    table.dropColumn("curatelle_personne_etablissement_mesures_nouvelles");
    table.dropColumn("curatelle_personne_etablissement_sortie_mesures");
    table.dropColumn("curatelle_personne_domicile_mesures_nouvelles");
    table.dropColumn("curatelle_personne_domicile_sortie_mesures");

    table.dropColumn("subroge_tuteur_createur_debut_annee");
    table.dropColumn("subroge_tuteur_createur_mesures_nouvelles");
    table.dropColumn("subroge_tuteur_createur_sortie_mesures");
    table.dropColumn("subroge_tuteur_createur_fin_annee");

    table.dropColumn("sauvegarde_justice_debut_annee");
    table.dropColumn("sauvegarde_justice_mesures_nouvelles");
    table.dropColumn("sauvegarde_justice_sortie_mesures");
    table.dropColumn("sauvegarde_justice_fin_annee");

    table.dropColumn("mandat_adhoc_majeur_debut_annee");
    table.dropColumn("mandat_adhoc_majeur_mesures_nouvelles");
    table.dropColumn("mandat_adhoc_majeur_sortie_mesures");
    table.dropColumn("mandat_adhoc_majeur_fin_annee");
  });
};
