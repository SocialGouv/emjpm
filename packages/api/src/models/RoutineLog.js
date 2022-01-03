const { Model } = require("objection");

class RoutineLog extends Model {
  static get tableName() {
    return "routine_log";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        end_date: { type: "timestamptz" },
        id: { type: "integer" },
        result: { type: "string" },
        start_date: { type: "timestamptz" },
        type: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = RoutineLog;
