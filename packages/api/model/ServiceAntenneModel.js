const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ServiceAntenneModel extends Model {
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
          type: "string"
        }
      }
    };
  }
  static get relationMappings() {
    const { Service } = require("./Service");
    const { Mandataire } = require("./Mandataire");

    return {
      service: {
        relation: Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "service_antenne.service_id",
          to: "users.id"
        }
      },
      mandataires: {
        relation: Model.HasManyRelation,
        modelClass: Mandataire,
        join: {
          from: "service_antenne.id",
          to: "mandataires.id"
        }
      }
    };
  }
}

module.exports = { ServiceAntenneModel };
