const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Mesures extends Model {
  static get tableName() {
    return "mesures";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" }
      }
    };
  }
}

module.exports = { Mesures };
