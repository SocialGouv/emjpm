const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Service extends Model {
  static get tableName() {
    return "services";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        etablissement: { type: "string" },
        telephone: { type: "string" },
        adresse: { type: "string" },
        code_postal: { type: "string" },
        ville: { type: "string" },
        dispo_max: {
          type: "integer"
        },
        zip: {
          type: "string"
        }
      }
    };
  }
}

module.exports = { Service };
