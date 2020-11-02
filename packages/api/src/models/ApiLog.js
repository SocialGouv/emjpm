const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

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

module.exports = { ApiLog };
