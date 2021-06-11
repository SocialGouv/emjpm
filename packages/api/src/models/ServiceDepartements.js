const knexConnection = require("~/db/knex");
const { Model } = require("objection");

const Models = require(".");

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

  static get relationMappings() {
    return {
      services: {
        join: {
          from: "service_departements.service_id",
          to: "services.id",
        },
        modelClass: Models.Service,
        relation: Model.HasManyRelation,
      },
    };
  }
}

module.exports = ServiceDepartements;
