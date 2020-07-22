const { Model } = require("objection");

const knexConnection = require("../db/knex");

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
      type: "object",
      properties: {
        id: { type: "integer" },
        mesure_id: { type: "integer" },
        annee: { type: ["integer", "null"] },
        niveau_ressource: { type: "integer" },
        prestations_sociales: { type: "json" },
      },
    };
  }
}

module.exports = { MesureRessources };
