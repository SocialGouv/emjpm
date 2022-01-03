const { Model } = require("objection");

class Magistrat extends Model {
  static get tableName() {
    return "magistrat";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "integer" },
        ti_id: { type: "integer" },
        user_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = Magistrat;
