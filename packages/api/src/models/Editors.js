const knexConnection = require("~/db/knex");
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
      properties: {
        api_token: { type: "integrer" },
        id: { type: "integer" },
        name: { type: "string" },
        redirect_uris: { type: "jsonb" },
      },
      type: "object",
    };
  }
}

module.exports = Editors;
