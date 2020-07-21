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
        nature_mesure: { type: "string" },
        champ_protection: { type: "string" },
        lieu_vie: { type: "string" },
        code_postal: { type: "string" },
        ville: { type: "string" },
        pays: { type: "string" },
        type_etablissement: { type: "string" },
        etablissement_siret: { type: "string" },
      },
    };
  }

  // static get relationMappings() {
  //   return {
  //     mesure: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Mesure,
  //       join: {
  //         from: "mesure_etat.mesure_id",
  //         to: "mesures.id",
  //       },
  //     },
  //   };
  // }
}

module.exports = { MesureEtat };
