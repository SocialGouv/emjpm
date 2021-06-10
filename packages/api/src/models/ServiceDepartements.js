const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ServiceDepartements extends Model {
  static get tableName() {
    return "service_departements";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        departement_code: { type: "string" },
        id: { type: "integer" },
        service_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = ServiceDepartements;
