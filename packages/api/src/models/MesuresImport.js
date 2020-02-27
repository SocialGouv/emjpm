const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class MesuresImport extends Model {
  static get tableName() {
    return "mesures_import";
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

module.exports = { MesuresImport };
