const { Model } = require("objection");

const knexConnection = require("../db/knex");

Model.knex(knexConnection);

class EnqueteReponsesServicePersonnelFormation extends Model {
  static get tableName() {
    return "enquete_reponses_service_personnel_formation";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        nb_delegues: { type: "number" },
        nb_delegues_cnc: { type: "number" },
        nb_delegues_en_formation: { type: "number" },
        nb_delegues_etp: { type: "float" },
        nb_delegues_niveau1: { type: "number" },
        nb_delegues_niveau1_etp: { type: "float" },
        nb_delegues_niveau2: { type: "number" },
        nb_delegues_niveau2_etp: { type: "float" },
        nb_delegues_niveau3: { type: "number" },
        nb_delegues_niveau3_etp: { type: "float" },
        nb_delegues_homme: { type: "number" },
        nb_delegues_non_formes: { type: "number" },
        nb_delegues_femme: { type: "number" },
        total_heures_delegues_en_formation: { type: "float" },
        nb_delegues_femme_etp: { type: "float" },
        nb_delegues_homme_etp: { type: "float" },
        nb_delegues_niveau4: { type: "number" },
        nb_delegues_niveau4_etp: { type: "float" },
        nb_delegues_niveau5: { type: "number" },
        nb_delegues_niveau5_etp: { type: "float" },
        nb_delegues_niveau6: { type: "number" },
        nb_delegues_niveau6_etp: { type: "float" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesServicePersonnelFormation };
