const { Model } = require("objection");

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
