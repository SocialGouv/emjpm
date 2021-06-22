const { Model } = require("objection");

class LbUpdateLog extends Model {
  static get tableName() {
    return "lb_update_log";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        comment: { type: ["string", "null"] },
        created_at: { type: "timestamptz" },
        id: { type: "integer" },
        lb_user_id: { type: ["integer", "null"] },
        op: { type: ["string", "null"] },
        service_id: { type: ["integer", "null"] },
        siret: { type: ["string", "null"] },
        table: { type: ["string", "null"] },
        user_id: { type: ["integer", "null"] },
      },
      type: "object",
    };
  }
}

module.exports = LbUpdateLog;
