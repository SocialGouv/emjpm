const { Model } = require("objection");

class ServiceTis extends Model {
  static get tableName() {
    return "service_tis";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "integer" },
        service_id: { type: "integer" },
        ti_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = ServiceTis;
