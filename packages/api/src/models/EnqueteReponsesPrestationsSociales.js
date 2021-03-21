const { Model } = require("objection");

const knexConnection = require("~/db/knex");

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
      properties: {
        aah: { type: "number" },
        als_apl: { type: "number" },
        apa: { type: "number" },
        asi: { type: "number" },
        aspa: { type: "number" },
        enquete_reponses_id: { type: "integer" },
        pch: { type: "number" },
        rsa: { type: "number" },
      },
      type: "object",
    };
  }
}

module.exports = EnqueteReponsesPrestationsSociales;
