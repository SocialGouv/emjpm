const { Model } = require("objection");
const Models = require(".");

class Dpfi extends Model {
  static get tableName() {
    return "dpfi";
  }

  static get idColumn() {
    return "id";
  }

  static get modifiers() {
    return {
      selectAll: (query) => {
        query.select("dpfi.*");
      },
    };
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse: { type: "string" },
        code_postal: { type: "string" },
        id: { type: "integer" },
        telephone: { type: "string" },
        telephone_portable: {
          type: "string",
        },
        ville: { type: "string" },
        zip: {
          type: "string",
        },
      },
      type: "object",
    };
  }
  static get relationMappings() {
    return {
      department: {
        join: {
          from: "dpfi.departement_code",
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.BelongsToOneRelation,
      },

      users: {
        join: {
          from: "dpfi.user_id",
          to: "users.id",
        },
        modelClass: Models.User,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}

module.exports = Dpfi;
