const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class UserTi extends Model {
  static get tableName() {
    return "user_tis";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "ti_id"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        ti_id: { type: "integer" }
      }
    };
  }
}

module.exports = { UserTi };
