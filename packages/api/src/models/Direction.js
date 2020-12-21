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
        department_id: { type: "integrer" },
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
          from: "direction.department_id",
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.HasOneRelation,
      },
      region: {
        join: {
          from: "direction.region_id",
          to: "regions.id",
        },
        modelClass: Models.Region,
        relation: Model.HasOneRelation,
      },
      users: {
        join: {
          from: "direction.user_id",
          to: "users.id",
        },
        modelClass: Models.Departement,
        relation: Model.HasOneRelation,
      },
    };
  }
}

module.exports = Direction;
