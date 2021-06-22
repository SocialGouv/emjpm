const { Model } = require("objection");

class ImpersonateLog extends Model {
  static get tableName() {
    return "impersonate_log";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        admin_user_id: { type: ["integer"] },
        created_at: { type: "timestamptz" },
        id: { type: "integer" },
        user_id: { type: ["integer"] },
      },
      type: "object",
    };
  }
}

module.exports = ImpersonateLog;
