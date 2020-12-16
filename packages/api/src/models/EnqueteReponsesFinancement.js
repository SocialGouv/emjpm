const { Model } = require("objection");

const knexConnection = require("~/db/knex");

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
      properties: {
        aide_sociale_conseil_departemental: { type: "float" },
        autre_produits: { type: "float" },
        charges_fonctionnement: { type: "float" },
        charges_personnel: { type: "float" },
        charges_preposes: { type: "float" },
        financement_public: { type: "float" },
        produits_bareme_prelevements: { type: "float" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesFinancement };
