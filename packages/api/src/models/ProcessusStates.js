const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ProcessusStates extends Model {
  static get tableName() {
    return "processus_states";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { ProcessusStates };
