const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ServiceAntenne extends Model {
  static get tableName() {
    return "service_antenne";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: {
          type: "string",
        },
        contact_firstname: {
          type: "string",
        },
        contact_lastname: {
          type: "string",
        },
        contact_email: {
          type: "string",
        },
        telephone: {
          type: "string",
        },
        adresse: {
          type: "string",
        },
        code_postal: {
          type: "string",
        },
        ville: {
          type: "string",
        },
        mesure_max: {
          type: "integer",
        },
      },
    };
  }

  static get relationMappings() {
    const { Service } = require("./Service");

    return {
      service: {
        relation: Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "service_antenne.service_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = { ServiceAntenne };
