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
      type: "object",
      properties: {
        id: { type: "integer" },
        request: { type: "jsonb" },
        response: { type: "jsonb" },
        token: { type: "string" }
      }
    };
  }
}

module.exports = { ApiLog };
