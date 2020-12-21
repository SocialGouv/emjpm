const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Region extends Model {
  static get tableName() {
    return "regions";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "integer" },
        nom: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = Region;
