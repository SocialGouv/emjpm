const { Model } = require("objection");

const knexConnection = require("../db/knex");
const { User } = require("./User");

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
      users: {
        join: {
          from: "direction.user_id",
          to: "users.id",
        },
        modelClass: User,
        relation: Model.HasManyRelation,
      },
    };
  }
}

module.exports = { Direction };
