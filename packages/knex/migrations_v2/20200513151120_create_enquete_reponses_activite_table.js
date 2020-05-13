exports.up = async knex => {
  await knex.schema.createTable("enquete_reponses_activite", table => {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("last_update").defaultTo(knex.fn.now());

    table.integer("curatelle_renforcee_etablissement_debut_annee");
    table.integer("curatelle_renforcee_etablissement_fin_annee");
    table.integer("curatelle_renforcee_domicile_debut_annee");
    table.integer("curatelle_renforcee_domicile_fin_annee");

    table.integer("curatelle_simple_etablissement_debut_annee");
    table.integer("curatelle_simple_etablissement_fin_annee");
    table.integer("curatelle_simple_domicile_debut_annee");
    table.integer("curatelle_simple_domicile_fin_annee");

    table.integer("tutelle_etablissement_debut_annee");
    table.integer("tutelle_etablissement_fin_annee");
    table.integer("tutelle_domicile_debut_annee");
    table.integer("tutelle_domicile_fin_annee");

    table.integer("accompagnement_judiciaire_etablissement_debut_annee");
    table.integer("accompagnement_judiciaire_etablissement_fin_annee");
    table.integer("accompagnement_judiciaire_domicile_debut_annee");
    table.integer("accompagnement_judiciaire_domicile_fin_annee");

    table.integer("curatelle_biens_etablissement_debut_annee");
    table.integer("curatelle_biens_etablissement_fin_annee");
    table.integer("curatelle_biens_domicile_debut_annee");
    table.integer("curatelle_biens_domicile_fin_annee");

    table.integer("curatelle_personne_etablissement_debut_annee");
    table.integer("curatelle_personne_etablissement_fin_annee");
    table.integer("curatelle_personne_domicile_debut_annee");
    table.integer("curatelle_personne_domicile_fin_annee");

    table.integer("revisions_main_levee");
    table.integer("revisions_masp");
    table.integer("revisions_reconduction");
    table.integer("revisions_changement");
    table.integer("revisions_autre");
    table.integer("sorties_main_levee");
    table.integer("sorties_deces");
    table.integer("sorties_masp");
  });
};

exports.down = async knex => {
  await knex.raw("DROP TABLE enquete_reponses_activite");
};
