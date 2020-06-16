const knexConnection = require("../db/knex");
const { Model } = require("objection");

Model.knex(knexConnection);

class EnqueteReponsesInformationsMandataire extends Model {
  static get tableName() {
    return "enquete_reponses_informations_mandataire";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        departement: { type: "string" },
        region: { type: "string" },
        nom: { type: "string" },
        benevole: { type: "boolean" },
        forme_juridique: { type: "string" },
        sexe: { type: "string" },
        anciennete: { type: "string" },
        tranche_age: { type: "string" },
        exerce_seul_activite: { type: "boolean" },
        estimation_etp: { type: "string" },
        exerce_secretaires_specialises: { type: "boolean" },
        secretaire_specialise_etp: { type: "number" },
        local_professionnel: { type: "boolean" },
      },
    };
  }
}

module.exports = { EnqueteReponsesInformationsMandataire };
