const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ServiceAdmin extends Model {
  static get tableName() {
    return "service_admin";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        service_id: { type: "integer" },
        user_id: { type: "integer" }
      }
    };
  }
}

module.exports = { ServiceAdmin };
