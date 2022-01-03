const { Model } = require("objection");

class EnqueteReponses extends Model {
  static get tableName() {
    return "enquete_reponses";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        created_at: { type: "timestamp" },
        enquete_id: { type: "integer" },
        mandataire_id: { type: "integer" },
        service_id: { type: "integer" },
        status: { type: "string" },
        submitted_at: { type: "timestamp" },
        uploaded_on: { type: "timestamp" },
      },
      type: "object",
    };
  }
}

module.exports = EnqueteReponses;
