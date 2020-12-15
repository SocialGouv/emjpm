const knexConnection = require("~/db/knex");
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
      properties: {
        anciennete: { type: "string" },
        benevole: { type: "boolean" },
        departement: { type: "string" },
        estimation_etp: { type: "string" },
        exerce_secretaires_specialises: { type: "boolean" },
        exerce_seul_activite: { type: "boolean" },
        forme_juridique: { type: "string" },
        local_professionnel: { type: "boolean" },
        nom: { type: "string" },
        region: { type: "string" },
        secretaire_specialise_etp: { type: "number" },
        sexe: { type: "string" },
        tranche_age: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesInformationsMandataire };
