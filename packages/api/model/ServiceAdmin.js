const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ServiceAdmin extends Model {
  static get tableName() {
    return "service_admin";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { ServiceAdmin };
