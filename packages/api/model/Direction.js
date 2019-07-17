const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Direction extends Model {
  static get tableName() {
    return "direction";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { Direction };
