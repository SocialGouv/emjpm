const { Model, raw } = require("objection");

const Models = require(".");

class Service extends Model {
  static get tableName() {
    return "services";
  }

  static get idColumn() {
    return "id";
  }

  static get modifiers() {
    return {
      selectAll: (query) => {
        query.select("services.*");
      },
      selectMesuresAwaiting: (query) => {
        query.select(
          raw("count_service_mesures_awaiting(services.*)::integer").as(
            "mesures_awaiting"
          )
        );
      },
      selectMesuresInProgress: (query) => {
        query.select(
          raw("count_service_mesures_in_progress(services.*)::integer").as(
            "mesures_in_progress"
          )
        );
      },
    };
  }

  static get relationMappings() {
    return {
      departements: {
        join: {
          from: "services.id",
          through: {
            from: "service_departements.service_id",
            to: "service_departements.departement_code",
          },
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.ManyToManyRelation,
      },
    };
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse: { type: "string" },
        code_postal: { type: "string" },
        competences: {
          type: "string",
        },
        dispo_max: {
          type: "integer",
        },
        etablissement: { type: "string" },
        id: { type: "integer" },
        mesures_awaiting: { type: "integer" },
        mesures_in_progress: { type: "integer" },
        telephone: { type: "string" },
        ville: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = Service;
