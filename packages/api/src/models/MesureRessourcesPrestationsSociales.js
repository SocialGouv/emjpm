const { Model } = require("objection");

const knexConnection = require("~/db/knex");
const Models = require(".");

Model.knex(knexConnection);

class MesureRessourcesPrestationsSociales extends Model {
  static get tableName() {
    return "mesure_ressources_prestations_sociales";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: "integer" },
        mesure_ressources_id: { type: "integer" },
        prestations_sociales: { type: "value" },
      },
      type: "object",
    };
  }

  static get relationMappings() {
    return {
      mesure_ressources: {
        join: {
          from: "mesure_ressources_prestations_sociales.mesure_ressources_id",
          to: "mesure_ressources.id",
        },
        modelClass: Models.MesureRessources,
        relation: Model.HasOneRelation,
      },
    };
  }
}

module.exports = MesureRessourcesPrestationsSociales;
