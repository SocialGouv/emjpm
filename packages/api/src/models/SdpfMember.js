const { Model } = require("objection");

class SdpfMember extends Model {
  static get tableName() {
    return "sdpf_members";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "integer" },
        is_admin: { type: "boolean" },
        sdpf_id: { type: "integer" },
        user_id: { type: "integer" },
      },
      type: "object",
    };
  }
}

module.exports = SdpfMember;
