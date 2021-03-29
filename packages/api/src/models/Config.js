const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Config extends Model {
  static get tableName() {
    return "config";
  }

  static get idColumn() {
    return "key";
  }

  static get jsonSchema() {
    return {
      properties: {
        key: { type: "string" },
        value: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = Config;
