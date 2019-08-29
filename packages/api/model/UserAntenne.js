const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class UserAntenne extends Model {
  static get tableName() {
    return "user_antenne";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { UserAntenne };
