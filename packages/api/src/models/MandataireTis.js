const { Model } = require("objection");

class MandataireTis extends Model {
  static get tableName() {
    return "mandataire_tis";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "integer" },
        mandataire_id: { type: "integer" },
        ti_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = MandataireTis;
