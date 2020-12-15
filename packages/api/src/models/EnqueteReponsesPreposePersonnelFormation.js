const { Model } = require("objection");

const knexConnection = require("~/db/knex");

Model.knex(knexConnection);

class EnqueteReponsesPreposePersonnelFormation extends Model {
  static get tableName() {
    return "enquete_reponses_prepose_personel_formation";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        formation_preposes_mjpm: { type: "jsonb" },
        nb_autre_personnel: { type: "number" },
        nb_autre_personnel_etp: { type: "number" },
        nb_preposes_femme: { type: "number" },
        nb_preposes_homme: { type: "number" },
        nb_preposes_mjpm: { type: "number" },
        nb_preposes_mjpm_etp: { type: "number" },
        niveaux_qualification: { type: "jsonb" },
      },
      type: "object",
    };
  }
}

module.exports = { EnqueteReponsesPreposePersonnelFormation };
