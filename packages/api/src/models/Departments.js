const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Department extends Model {
  static get tableName() {
    return "departements";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        id_finess: {
          type: "string",
        },
        nom: { type: "string" },
        code: { type: "string" },
      },
    };
  }
}

module.exports = { Department };
