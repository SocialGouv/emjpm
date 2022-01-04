const { Model } = require("objection");

class ServiceMember extends Model {
  static get tableName() {
    return "service_members";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "integer" },
        is_admin: { type: "boolean" },
        service_id: { type: "integer" },
        user_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = ServiceMember;
