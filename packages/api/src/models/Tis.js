const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Tis extends Model {
  static get tableName() {
    return "tis";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Tis;
