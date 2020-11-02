const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponsesActivite extends Model {
  static get tableName() {
    return "enquete_reponses_activite";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        curatelle_renforcee_domicile_debut_annee: { TYPE: "NUMBER" },
        curatelle_renforcee_domicile_fin_annee: { TYPE: "NUMBER" },
        curatelle_renforcee_domicile_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_renforcee_domicile_sortie_mesures: { TYPE: "NUMBER" },
        curatelle_renforcee_etablissement_debut_annee: { TYPE: "NUMBER" },
        curatelle_renforcee_etablissement_fin_annee: { TYPE: "NUMBER" },
        curatelle_renforcee_etablissement_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_renforcee_etablissement_sortie_mesures: { TYPE: "NUMBER" },

        curatelle_simple_domicile_debut_annee: { TYPE: "NUMBER" },
        curatelle_simple_domicile_fin_annee: { TYPE: "NUMBER" },
        curatelle_simple_domicile_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_simple_domicile_sortie_mesures: { TYPE: "NUMBER" },
        curatelle_simple_etablissement_debut_annee: { TYPE: "NUMBER" },
        curatelle_simple_etablissement_fin_annee: { TYPE: "NUMBER" },
        curatelle_simple_etablissement_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_simple_etablissement_sortie_mesures: { TYPE: "NUMBER" },

        accompagnement_judiciaire_etablissement_debut_annee: { TYPE: "NUMBER" },
        tutelle_domicile_debut_annee: { TYPE: "NUMBER" },
        accompagnement_judiciaire_etablissement_fin_annee: { TYPE: "NUMBER" },
        tutelle_domicile_fin_annee: { TYPE: "NUMBER" },
        accompagnement_judiciaire_domicile_debut_annee: { TYPE: "NUMBER" },
        tutelle_etablissement_debut_annee: { TYPE: "NUMBER" },
        accompagnement_judiciaire_domicile_fin_annee: { TYPE: "NUMBER" },
        tutelle_etablissement_fin_annee: { TYPE: "NUMBER" },

        accompagnement_judiciaire_domicile_mesures_nouvelles: {
          TYPE: "NUMBER",
        },
        tutelle_etablissement_mesures_nouvelles: { TYPE: "NUMBER" },
        accompagnement_judiciaire_domicile_sortie_mesures: { TYPE: "NUMBER" },
        tutelle_etablissement_sortie_mesures: { TYPE: "NUMBER" },
        accompagnement_judiciaire_etablissement_mesures_nouvelles: {
          TYPE: "NUMBER",
        },
        tutelle_domicile_mesures_nouvelles: { TYPE: "NUMBER" },
        accompagnement_judiciaire_etablissement_sortie_mesures: {
          TYPE: "NUMBER",
        },
        tutelle_domicile_sortie_mesures: { TYPE: "NUMBER" },

        curatelle_biens_domicile_debut_annee: { TYPE: "NUMBER" },
        curatelle_biens_domicile_fin_annee: { TYPE: "NUMBER" },
        curatelle_biens_domicile_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_biens_domicile_sortie_mesures: { TYPE: "NUMBER" },
        curatelle_biens_etablissement_debut_annee: { TYPE: "NUMBER" },
        curatelle_biens_etablissement_fin_annee: { TYPE: "NUMBER" },
        curatelle_biens_etablissement_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_biens_etablissement_sortie_mesures: { TYPE: "NUMBER" },

        curatelle_personne_domicile_debut_annee: { TYPE: "NUMBER" },
        curatelle_personne_domicile_fin_annee: { TYPE: "NUMBER" },
        curatelle_personne_domicile_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_personne_domicile_sortie_mesures: { TYPE: "NUMBER" },
        curatelle_personne_etablissement_debut_annee: { TYPE: "NUMBER" },
        curatelle_personne_etablissement_fin_annee: { TYPE: "NUMBER" },
        curatelle_personne_etablissement_mesures_nouvelles: { TYPE: "NUMBER" },
        curatelle_personne_etablissement_sortie_mesures: { TYPE: "NUMBER" },

        mandat_adhoc_majeur_debut_annee: { TYPE: "NUMBER" },
        sauvegarde_justice_debut_annee: { TYPE: "NUMBER" },
        mandat_adhoc_majeur_fin_annee: { TYPE: "NUMBER" },
        sauvegarde_justice_fin_annee: { TYPE: "NUMBER" },

        mandat_adhoc_majeur_mesures_nouvelles: { TYPE: "NUMBER" },
        subroge_tuteur_createur_debut_annee: { TYPE: "NUMBER" },
        mandat_adhoc_majeur_sortie_mesures: { TYPE: "NUMBER" },
        subroge_tuteur_createur_fin_annee: { TYPE: "NUMBER" },

        revisions_autre: { TYPE: "NUMBER" },
        subroge_tuteur_createur_mesures_nouvelles: { TYPE: "NUMBER" },
        revisions_changement: { TYPE: "NUMBER" },
        subroge_tuteur_createur_sortie_mesures: { TYPE: "NUMBER" },

        revisions_main_levee: { TYPE: "NUMBER" },
        sauvegarde_justice_mesures_nouvelles: { TYPE: "NUMBER" },
        revisions_masp: { TYPE: "NUMBER" },
        sauvegarde_justice_sortie_mesures: { TYPE: "NUMBER" },
        revisions_reconduction: { TYPE: "NUMBER" },

        sorties_deces: { TYPE: "NUMBER" },
        sorties_main_levee: { TYPE: "NUMBER" },
        sorties_masp: { TYPE: "NUMBER" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesActivite };
