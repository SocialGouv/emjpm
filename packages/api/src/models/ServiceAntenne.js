const knexConnection = require("~/db/knex");
const { Model } = require("objection");

const Models = require(".");

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
      properties: {
        adresse: {
          type: "string",
        },
        code_postal: {
          type: "string",
        },
        contact_email: {
          type: "string",
        },
        contact_firstname: {
          type: "string",
        },
        contact_lastname: {
          type: "string",
        },
        id: { type: "integer" },
        mesure_max: {
          type: "integer",
        },
        name: {
          type: "string",
        },
        telephone: {
          type: "string",
        },
        ville: {
          type: "string",
        },
      },
      type: "object",
    };
  }

  static get relationMappings() {
    return {
      service: {
        join: {
          from: "service_antenne.service_id",
          to: "users.id",
        },
        modelClass: Models.Service,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}

module.exports = ServiceAntenne;
