const knexConnection = require("~/db/knex");
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
      properties: {
        client_id: { type: "integer" },
        code: { type: "string" },
        created_at: { type: "string" },
        expiresAt: { type: "string" },
        id: { type: "integer" },
        redirect_uri: { type: "string" },
        user_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = AuthorizationCodes;
