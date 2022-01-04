const { Model } = require("objection");

class ApiLog extends Model {
  static get tableName() {
    return "api_logs";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        editor_id: { type: "integer" },
        id: { type: "integer" },
        request_method: { type: "string" },
        request_params: { type: "jsonb" },
        request_url: { type: "string" },
        response: { type: "jsonb" },
        token: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = ApiLog;
