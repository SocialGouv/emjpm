const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Logs extends Model {
  static get tableName() {
    return "logs_data";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Logs;
