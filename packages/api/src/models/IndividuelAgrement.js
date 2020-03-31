const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class IndividuelAgrement extends Model {
  static get tableName() {
    return "individuel_agrements";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { IndividuelAgrement };
