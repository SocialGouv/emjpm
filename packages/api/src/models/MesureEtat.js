const { Model } = require("objection");

const knexConnection = require("~/db/knex");

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
      properties: {
        champ_mesure: { type: ["string", null] },
        code_postal: { type: ["string", null] },
        date_changement_etat: { type: "date" },
        id: { type: "integer" },
        lieu_vie: { type: "string" },
        mesure_id: { type: "integer" },
        nature_mesure: { type: "string" },
        pays: { type: "string" },
        type_etablissement: { type: ["string", null] },
        ville: { type: ["string", null] },
      },
      type: "object",
    };
  }
}

module.exports = { MesureEtat };
