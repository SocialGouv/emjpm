const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponsesPrestationsSociales extends Model {
  static get tableName() {
    return "enquete_reponses_prestations_sociales";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        aah: { type: "number" },
        pch: { type: "number" },
        asi: { type: "number" },
        rsa: { type: "number" },
        als_apl: { type: "number" },
        aspa: { type: "number" },
        apa: { type: "number" },
      },
    };
  }
}

module.exports = { EnqueteReponsesPrestationsSociales };
