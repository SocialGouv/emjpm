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
      properties: {
        aah: { type: "float" },
        als_apl: { type: "float" },
        apa: { type: "float" },
        asi: { type: "float" },
        aspa: { type: "float" },
        curatelle_renforcee: { type: "jsonb" },
        curatelle_simple: { type: "jsonb" },
        maj: { type: "jsonb" },
        pch: { type: "float" },
        rsa: { type: "float" },
        sauvegarde_autres_mesures: { type: "jsonb" },
        tutelle: { type: "jsonb" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesPreposePrestationsSociales };
