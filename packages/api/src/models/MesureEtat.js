const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class MesureEtat extends Model {
  static get tableName() {
    return "mesure_etat";
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
        date_changement_etat: { type: "date" },
        nature_mesure: { type: "string" },
        champ_mesure: { type: ["string", null] },
        lieu_vie: { type: "string" },
        code_postal: { type: "string" },
        ville: { type: "string" },
        pays: { type: "string" },
        type_etablissement: { type: ["string", null] },
      },
    };
  }
}

module.exports = { MesureEtat };
