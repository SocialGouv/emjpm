const { Model } = require("objection");

const Models = require(".");

class Direction extends Model {
  static get tableName() {
    return "direction";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        departement_code: { type: ["string", "null"] },
        id: { type: "integer" },
        region_id: { type: ["integer", "null"] },
        type: { type: "string" },
        user_id: { type: "integer" },
      },
      type: "object",
    };
  }

  static get relationMappings() {
    return {
      departement: {
        join: {
          from: "direction.departement_code",
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.HasOneRelation,
      },

      departement_sdpf: {
        join: {
          from: "direction.departement_code",
          through: {
            from: "sdpf_departements.departement_code",
            to: "sdpf_departements.service_id",
          },
          to: "sdpf.id",
        },
        modelClass: Models.Sdpf,
        relation: Model.ManyToManyRelation,
      },

      departement_services: {
        join: {
          from: "direction.departement_code",
          through: {
            from: "service_departements.departement_code",
            to: "service_departements.service_id",
          },
          to: "services.id",
        },
        modelClass: Models.Service,
        relation: Model.ManyToManyRelation,
      },
      departements: {
        join: {
          from: "direction.departement_code",
          through: {
            from: "service_departements.departement_code",
            to: "service_departements.service_id",
          },
          to: "services.id",
        },
        modelClass: Models.Service,
        relation: Model.ManyToManyRelation,
      },
      region: {
        join: {
          from: "direction.region_id",
          to: "regions.id",
        },
        modelClass: Models.Region,
        relation: Model.HasOneRelation,
      },
      region_service_departements: {
        join: {
          from: "direction.region_id",
          through: {
            from: "departements.id_region",
            to: "departements.id",
          },
          to: "service_departements.departement_code",
        },
        modelClass: Models.ServiceDepartements,
        relation: Model.ManyToManyRelation,
      },
      users: {
        join: {
          from: "direction.user_id",
          to: "users.id",
        },
        modelClass: Models.User,
        relation: Model.HasOneRelation,
      },
    };
  }
}

module.exports = Direction;
