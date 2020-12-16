const knexConnection = require("~/db/knex");
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
      properties: {
        email: { type: "string" },
        id: { type: "integer" },
        service_id: { type: "integer" },
        token: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = { ServiceMemberInvitation };
