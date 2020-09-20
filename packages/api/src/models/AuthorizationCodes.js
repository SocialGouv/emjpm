const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class AuthorizationCodes extends Model {
  static get tableName() {
    return "authorization_codes";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        created_at: { type: "string" },
        code: { type: "string" },
        redirect_uri: { type: "string" },
        client_id: { type: "integer" },
        user_id: { type: "integer" },
        expiresAt: { type: "string" },
      },
    };
  }
}

module.exports = { AuthorizationCodes };
