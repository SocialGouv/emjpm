const { Model } = require("objection");

class MandatairesIndividuelDepartement extends Model {
  static get tableName() {
    return "mandataire_individuel_departements";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        created_at: { type: "timestamptz" },
        departement_code: { type: "string" },
        departement_financeur: { type: "boolean" },
        id: { type: "integer" },
        liste_blanche_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = MandatairesIndividuelDepartement;
