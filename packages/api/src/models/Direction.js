const { Model } = require("objection");

const knexConnection = require("~/db/knex");
const Models = require(".");

Model.knex(knexConnection);

class Direction extends Model {
  static get tableName() {
    return "direction";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        departement_code: { type: "string" },
        id: { type: "integer" },
        region_id: { type: "integrer" },
        type: { type: "string" },
        user_id: { type: "integrer" },
      },
      type: "object",
    };
  }

  static get relationMappings() {
    return {
      departement: {
        join: {
          from: "direction.departement_code",
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.HasOneRelation,
      },
      departement_services: {
        join: {
          from: "direction.departement_code",
          to: "services.departement_code",
        },
        modelClass: Models.Service,
        relation: Model.HasManyRelation,
      },
      region: {
        join: {
          from: "direction.region_id",
          to: "regions.id",
        },
        modelClass: Models.Region,
        relation: Model.HasOneRelation,
      },
      region_services: {
        join: {
          from: "direction.region_id",
          through: {
            from: "departements.id_region",
            to: "departements.id",
          },
          to: "services.departement_code",
        },
        modelClass: Models.Service,
        relation: Model.ManyToManyRelation,
      },
      users: {
        join: {
          from: "direction.user_id",
          to: "users.id",
        },
        modelClass: Models.User,
        relation: Model.HasOneRelation,
      },
    };
  }
}

module.exports = Direction;
