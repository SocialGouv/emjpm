const { Model } = require("objection");

class PrestationsSociales extends Model {
  static get tableName() {
    return "prestations_sociales";
  }

  static get idColumn() {
    return "value";
  }

  static get jsonSchema() {
    return {
      properties: {
        value: { type: "text" },
      },
      type: "object",
    };
  }
}

module.exports = PrestationsSociales;
