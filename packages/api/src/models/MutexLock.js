const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class MutexLock extends Model {
  static get tableName() {
    return "mutex_lock";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        expiration: { type: "timestamptz" },
        id: { type: "integer" },
        key: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = MutexLock;
