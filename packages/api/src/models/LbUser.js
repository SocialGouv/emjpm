const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class LbUser extends Model {
  static get tableName() {
    return "lb_users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse1: { type: "string" },
        adresse2: { type: "string" },
        code_postal: {
          type: "string",
        },
        email: { type: "string" },
        nom: { type: "string" },
        prenom: { type: "string" },
        siret: {
          type: "string",
        },
        ville: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = { LbUser };
