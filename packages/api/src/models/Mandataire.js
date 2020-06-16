const knexConnection = require("../db/knex");
const { Model } = require("objection");

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
      type: "object",
      properties: {
        etablissement: { type: "string" },
        id: { type: "integer" },
        genre: {
          type: "string",
        },
        telephone: { type: "string" },
        telephone_portable: {
          type: "string",
        },
        adresse: { type: "string" },
        code_postal: { type: "string" },
        ville: { type: "string" },
        dispo_max: {
          type: "integer",
        },
        zip: {
          type: "string",
        },
      },
    };
  }
  static get relationMappings() {
    const { User } = require("./User");
    const { Department } = require("./Departments");
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "mandataires.user_id",
          to: "users.id",
        },
      },
      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: "mandataires.department_id",
          to: "departements.id",
        },
      },
    };
  }
}

module.exports = { Mandataire };
