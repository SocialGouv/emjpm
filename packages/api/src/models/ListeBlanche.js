const { Model } = require("objection");

class ListeBlanche extends Model {
  static get tableName() {
    return "liste_blanche";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse: { type: "string" },
        adresse_complement: { type: "string" },
        code_postal: {
          type: "string",
        },
        email: { type: "string" },
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

module.exports = ListeBlanche;
