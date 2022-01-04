const { Model } = require("objection");

class OcmiMandataire extends Model {
  static get tableName() {
    return "ocmi_mandataires";
  }

  static get idColumn() {
    return "siret";
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse1: { type: "string" },
        adresse2: { type: "string" },
        code_postal: {
          type: "string",
        },
        departement_financeur: { type: "string" },
        email: { type: "string" },
        mesures: { type: "json" },
        nom: { type: "string" },
        prenom: { type: "string" },
        siret: {
          type: "string",
        },
        ville: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = OcmiMandataire;
