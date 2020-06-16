const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Magistrat extends Model {
  static get tableName() {
    return "magistrat";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        ti_id: { type: "integer" },
      },
    };
  }
}

module.exports = { Magistrat };
