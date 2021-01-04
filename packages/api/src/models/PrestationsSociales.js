const { Model } = require("objection");

const knexConnection = require("~/db/knex");

Model.knex(knexConnection);

class PrestationsSociales extends Model {
  static get tableName() {
    return "prestations_sociales";
  }

  static get idColumn() {
    return "value";
  }

  static get jsonSchema() {
    return {
      properties: {
        value: { type: "text" },
      },
      type: "object",
    };
  }
}

module.exports = PrestationsSociales;
