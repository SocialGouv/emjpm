const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Mesures extends Model {
  static get tableName() {
    return "mesures";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { Mesures };
