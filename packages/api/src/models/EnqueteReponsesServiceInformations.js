const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponsesServiceInformations extends Model {
  static get tableName() {
    return "enquete_reponses_service_informations";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        affiliation_federation: { type: "string" },
        departement: { type: "string" },
        nb_structures_concernees: { type: "number" },
        nom: { type: "string" },
        region: { type: "string" },
        type_organisme_gestionnaire: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesServiceInformations };
