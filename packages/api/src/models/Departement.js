const { Model } = require("objection");

class Departement extends Model {
  static get tableName() {
    return "departements";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "string" },
        id_finess: {
          type: "string",
        },
        nom: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = Departement;
