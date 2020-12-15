const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class UserRole extends Model {
  static get tableName() {
    return "user_role";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { UserRole };
