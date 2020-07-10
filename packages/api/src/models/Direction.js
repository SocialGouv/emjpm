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
      type: "object",
      properties: {
        id: { type: "integer" },
        region_id: { type: "integrer" },
        user_id: { type: "integrer" },
        department_id: { type: "integrer" },
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "direction.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = { Direction };
