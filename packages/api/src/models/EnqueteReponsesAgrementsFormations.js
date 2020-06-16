const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class EnqueteReponsesAgrementsFormations extends Model {
  static get tableName() {
    return "enquete_reponses_agrements_formations";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        annee_agrement: { type: "number" },
        nb_departements: { type: "string" },
        annee_debut_activite: { type: "date" },
        cnc_annee_obtention: { type: "number" },
        cnc_heures_formation: { type: "number" },
        cumul_delegue_service: { type: "number" },
        cumul_delegue_service_etp: { type: "string" },
        cumul_prepose: { type: "number" },
        cumul_prepose_etp: { type: "string" },
        debut_activite_avant_2009: { type: "boolean" },
        niveau_qualification: { type: "number" },
        niveau_qualification_secretaire_spe: { type: "number" },
        secretaire_specialise: { type: "boolean" },
        nb_mesures_dep_finance: { type: "number" },
        nb_mesures_dep_autres: { type: "number" },
      },
    };
  }
}

module.exports = { EnqueteReponsesAgrementsFormations };
