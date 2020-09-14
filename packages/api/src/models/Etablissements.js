const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Etablissements extends Model {
  static get tableName() {
    return "etablissements";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { Etablissements };
