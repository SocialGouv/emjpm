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
      type: "object",
      properties: {
        departement: { type: "string" },
        region: { type: "string" },
        nom: { type: "string" },
        nb_structures_concernees: { type: "number" },
        affiliation_federation: { type: "string" },
        type_organisme_gestionnaire: { type: "string" },
      },
    };
  }
}

module.exports = { EnqueteReponsesServiceInformations };
