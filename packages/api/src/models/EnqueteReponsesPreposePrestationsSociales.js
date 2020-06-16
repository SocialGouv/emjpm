const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponsesPreposePrestationsSociales extends Model {
  static get tableName() {
    return "enquete_reponses_prepose_prestations_sociales";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        tutelle: { type: "jsonb" },
        curatelle_simple: { type: "jsonb" },
        curatelle_renforcee: { type: "jsonb" },
        sauvegarde_autres_mesures: { type: "jsonb" },
        maj: { type: "jsonb" },
        aah: { type: "float" },
        pch: { type: "float" },
        asi: { type: "float" },
        rsa: { type: "float" },
        als_apl: { type: "float" },
        aspa: { type: "float" },
        apa: { type: "float" },
      },
    };
  }
}

module.exports = { EnqueteReponsesPreposePrestationsSociales };
