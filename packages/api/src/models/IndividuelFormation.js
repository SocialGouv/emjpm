const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class IndividuelFormation extends Model {
  static get tableName() {
    return "individuel_formations";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { IndividuelFormation };
