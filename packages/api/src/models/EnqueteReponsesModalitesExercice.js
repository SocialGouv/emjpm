const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponsesModalitesExercice extends Model {
  static get tableName() {
    return "enquete_reponses_modalites_exercice";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        departement: { type: "string" },
        region: { type: "string" },
        raison_sociale: { type: "string" },
        personnalite_juridique_etablissement: { type: "string" },
        activite_personne_physique: { type: "number" },
        activite_service: { type: "number" },
        etablissement_personne_morale: { type: "number" },
        etablissement_convention_groupement: { type: "number" },
        nombre_etablissements: { type: "number" },
        total_mesures_etablissements: { type: "number" },
        nombre_lits_journee_hospitalisation: { type: "jsonb" },
        actions_information_tuteurs_familiaux: { type: "number" }
      }
    };
  }
}

module.exports = { EnqueteReponsesModalitesExercice };
