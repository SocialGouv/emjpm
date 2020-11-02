const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class AccessToken extends Model {
  static get tableName() {
    return "access_tokens";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        access_token: { type: "string" },
        editor_id: { type: "integrer" },
        editor_url: { type: "string" },
        expired: { type: "boolean" },
        expired_on: { type: "string" },
        id: { type: "integer" },
        user_id: { type: "integrer" },
      },
      type: "object",
    };
  }
}

module.exports = { AccessToken };
