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
        asi: { type: "float" },
        als_apl: { type: "float" },
        curatelle_renforcee: { type: "jsonb" },
        apa: { type: "float" },
        curatelle_simple: { type: "jsonb" },
        aspa: { type: "float" },
        maj: { type: "jsonb" },
        pch: { type: "float" },
        tutelle: { type: "jsonb" },
        rsa: { type: "float" },
        sauvegarde_autres_mesures: { type: "jsonb" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesPreposePrestationsSociales };
