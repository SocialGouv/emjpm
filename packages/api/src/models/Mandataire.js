const knexConnection = require("~/db/knex");
const { Model } = require("objection");
const Models = require(".");

Model.knex(knexConnection);

class Mandataire extends Model {
  static get tableName() {
    return "mandataires";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      properties: {
        adresse: { type: "string" },
        code_postal: { type: "string" },
        dispo_max: {
          type: "integer",
        },
        genre: {
          type: "string",
        },
        id: { type: "integer" },
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
