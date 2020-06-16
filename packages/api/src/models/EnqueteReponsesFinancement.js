const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponsesFinancement extends Model {
  static get tableName() {
    return "enquete_reponses_financement";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        charges_personnel: { type: "float" },
        charges_preposes: { type: "float" },
        charges_fonctionnement: { type: "float" },
        produits_bareme_prelevements: { type: "float" },
        autre_produits: { type: "float" },
        financement_public: { type: "float" },
        aide_sociale_conseil_departemental: { type: "float" },
      },
    };
  }
}

module.exports = { EnqueteReponsesFinancement };
