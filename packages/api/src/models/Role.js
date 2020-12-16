const knexConnection = require("~/db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class Role extends Model {
  static get tableName() {
    return "role";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { Role };
