const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Editors extends Model {
  static get tableName() {
    return "editors";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        api_token: { type: "integrer" },
        name: { type: "string" },
        redirect_uris: { type: "jsonb" },
      },
    };
  }
}

module.exports = { Editors };
