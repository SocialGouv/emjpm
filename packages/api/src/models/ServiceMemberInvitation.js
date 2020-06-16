const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class ServiceMemberInvitation extends Model {
  static get tableName() {
    return "service_member_invitations";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        service_id: { type: "integer" },
        token: { type: "string" },
      },
    };
  }
}

module.exports = { ServiceMemberInvitation };
