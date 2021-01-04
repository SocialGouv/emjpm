const { Model } = require("objection");
const Models = require(".");

const knexConnection = require("~/db/knex");

Model.knex(knexConnection);

class MesureRessources extends Model {
  static get tableName() {
    return "mesure_ressources";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        annee: { type: "integer" },
        id: { type: "integer" },
        mesure_id: { type: "integer" },
        niveau_ressource: { type: "numeric" },
      },
      type: "object",
    };
  }
  static get relationMappings() {
    return {
      mesure_ressources_prestations_sociales: {
        join: {
          from: "mesure_ressources.id",
          to: "mesure_ressources_prestations_sociales.mesure_ressources_id",
        },
        modelClass: Models.MesureRessourcesPrestationsSociales,
        relation: Model.HasManyRelation,
      },
      prestations_sociales: {
        join: {
          from: "mesure_ressources.id",
          through: {
            from: "mesure_ressources_prestations_sociales.mesure_ressources_id",
            to: "mesure_ressources_prestations_sociales.prestations_sociales",
          },
          to: "prestations_sociales.value",
        },
        modelClass: Models.PrestationsSociales,
        relation: Model.ManyToManyRelation,
      },
    };
  }
}

module.exports = MesureRessources;
