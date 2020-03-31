const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class IndividuelExercice extends Model {
  static get tableName() {
    return "individuel_exercices";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { IndividuelExercice };
