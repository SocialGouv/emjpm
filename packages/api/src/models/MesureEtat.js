const { Model } = require("objection");

const knexConnection = require("../db/knex");
const { Mesure } = require("./Mesure");

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
        nature_mesure: { type: "nature_mesure_type" },
        champ_protection: { type: "champ_protection_type" },
        lieu_vie: { type: "lieu_vie_type" },
        code_postal: { type: "string" },
        ville: { type: "string" },
        pays: { type: "string" },
        type_etablissement: { type: "type_etablissement_type" },
        etablissement_siret: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      service: {
        relation: Model.BelongsToOneRelation,
        modelClass: Mesure,
        join: {
          from: "mesure_etat.mesure_id",
          to: "mesures.id",
        },
      },
    };
  }
}

module.exports = { MesureEtat };
