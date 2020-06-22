const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponses extends Model {
  static get tableName() {
    return "enquete_reponses";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        created_at: { type: "timestamp" },
        submitted_at: { type: "timestamp" },
        uploaded_on: { type: "timestamp" },
        enquete_id: { type: "integer" },
        mandataire_id: { type: "integer" },
        service_id: { type: "integer" },
        enquete_reponses_informations_mandataire_id: { type: "integer" },
        enquete_reponses_prestations_sociale_id: { type: "integer" },
        enquete_reponses_agrements_formations_id: { type: "integer" },
        enquete_reponses_activite_id: { type: "integer" },
        enquete_reponses_populations_id: { type: "integer" },
        enquete_reponses_modalites_exercice_id: { type: "integer" },
        enquete_reponses_financement_id: { type: "integer" },
        enquete_reponses_prepose_personel_formation_id: { type: "integer" },
        enquete_reponses_prepose_prestations_sociales_id: { type: "integer" },
        status: { type: "string" },
      },
    };
  }
}

module.exports = { EnqueteReponses };
