const { Model } = require("objection");

class AdminInvitation extends Model {
  static get tableName() {
    return "admin_invitations";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        email: { type: "string" },
        id: { type: "integer" },
        token: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = AdminInvitation;
