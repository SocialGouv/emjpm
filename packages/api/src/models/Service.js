const knexConnection = require("~/db/knex");
const { Model } = require("objection");

const Models = require(".");

Model.knex(knexConnection);

class Service extends Model {
  static get tableName() {
    return "services";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      departements: {
        join: {
          from: "services.id",
          through: {
            from: "service_departements.service_id",
            to: "service_departements.departement_code",
          },
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.ManyToManyRelation,
      },
    };
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse: { type: "string" },
        code_postal: { type: "string" },
        competences: {
          type: "string",
        },
        dispo_max: {
          type: "integer",
        },
        etablissement: { type: "string" },
        id: { type: "integer" },
        telephone: { type: "string" },
        ville: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = Service;
