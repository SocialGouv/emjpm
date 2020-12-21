const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ProcessusStates extends Model {
  static get tableName() {
    return "processus_states";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        end_date: { type: "timestamptz" },
        id: { type: "string" },
        start_date: { type: "timestamptz" },
      },
      type: "object",
    };
  }
}

module.exports = ProcessusStates;
