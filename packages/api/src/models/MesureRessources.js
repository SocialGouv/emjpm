const { Model } = require("objection");

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
        niveau_ressource: { type: "integer" },
        prestations_sociales: { type: "json" },
      },
      type: "object",
    };
  }
}

module.exports = MesureRessources;
