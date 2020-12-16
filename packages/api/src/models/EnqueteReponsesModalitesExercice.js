const { Model } = require("objection");

const knexConnection = require("~/db/knex");

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
      properties: {
        actions_information_tuteurs_familiaux: { type: "boolean" },
        activite_exercee_par: { type: "string" },
        departement: { type: "string" },
        etablissements_type: { type: "string" },
        nombre_etablissements: { type: "number" },
        nombre_lits_journee_hospitalisation: { type: "jsonb" },
        personnalite_juridique_etablissement: { type: "string" },
        raison_sociale: { type: "string" },
        region: { type: "string" },
        total_mesures_etablissements: { type: "number" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesModalitesExercice };
