const { Model } = require("objection");

const Models = require(".");

class Service extends Model {
  static get tableName() {
    return "sdpf";
  }

  static get idColumn() {
    return "id";
  }

  static get modifiers() {
    return {
      selectAll: (query) => {
        query.select("sdpf.*");
      },
    };
  }

  static get relationMappings() {
    return {
      departements: {
        join: {
          from: "sdpf.id",
          through: {
            from: "sdpf_departements.sdpf_id",
            to: "sdpf_departements.departement_code",
          },
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.ManyToManyRelation,
      },
      users: {
        join: {
          from: "sdpf.id",
          through: {
            from: "sdpf_members.sdpf_id",
            to: "sdpf_members.user_id",
          },
          to: "users.id",
        },
        modelClass: Models.User,
        relation: Model.ManyToManyRelation,
      },
    };
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse: { type: "string" },
        adresse_complement: { type: "string" },
        code_postal: { type: "string" },
        competences: {
          type: "string",
        },
        dispo_max: {
          type: "integer",
        },
        etablissement: { type: "string" },
        id: { type: "integer" },
        location_adresse: { type: "string" },
        telephone: { type: "string" },
        ville: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = Service;
