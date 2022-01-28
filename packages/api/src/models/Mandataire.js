const { Model, raw } = require("objection");
const Models = require(".");

class Mandataire extends Model {
  static get tableName() {
    return "mandataires";
  }

  static get idColumn() {
    return "id";
  }

  static get modifiers() {
    return {
      selectAll: (query) => {
        query.select("mandataires.*");
      },
      selectMesuresEnAttente: (query) => {
        query.select(
          raw("count_mandataire_mesures_en_attente(mandataires.*)::integer").as(
            "mesures_en_attente"
          )
        );
      },
      selectMesuresEnCours: (query) => {
        query.select(
          raw("count_mandataire_mesures_en_cours(mandataires.*)::integer").as(
            "mesures_en_cours"
          )
        );
      },
    };
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse: { type: "string" },
        code_postal: { type: "string" },
        dispo_max: {
          type: "integer",
        },
        id: { type: "integer" },
        mesures_en_attente: { type: "integer" },
        mesures_en_cours: { type: "integer" },
        telephone: { type: "string" },
        telephone_portable: {
          type: "string",
        },
        ville: { type: "string" },
        zip: {
          type: "string",
        },
      },
      type: "object",
    };
  }
  static get relationMappings() {
    return {
      department: {
        join: {
          from: "mandataires.departement_code",
          to: "departements.id",
        },
        modelClass: Models.Departement,
        relation: Model.BelongsToOneRelation,
      },
      tis: {
        join: {
          from: "mandataires.id",
          through: {
            from: "mandataire_tis.mandataire_id",
            to: "mandataire_tis.ti_id",
          },
          to: "tis.id",
        },
        modelClass: Models.Departement,
        relation: Model.ManyToManyRelation,
      },
      users: {
        join: {
          from: "mandataires.user_id",
          to: "users.id",
        },
        modelClass: Models.Departement,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}

module.exports = Mandataire;
