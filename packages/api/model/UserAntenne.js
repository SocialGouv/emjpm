const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class UserAntenne extends Model {
  static get tableName() {
    return "user_antenne";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        antenne_id: { type: "integer" },
        user_id: { type: "integer" }
      }
    };
  }
}

module.exports = { UserAntenne };
