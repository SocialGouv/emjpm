const { Model } = require("objection");

const knexConnection = require("../db/knex");
const { MesureEtat } = require("./MesureEtat");

Model.knex(knexConnection);

class Mesure extends Model {
  static get tableName() {
    return "mesures";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      etats: {
        relation: Model.HasManyRelation,
        modelClass: MesureEtat,
        join: {
          from: "mesures.id",
          to: "mesure_etat.mesure_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        code_postal: { type: ["string", null] },
        ville: { type: ["string", null] },
        etablissement: { type: ["string", null] },
        mandataire_id: { type: ["integer", null] },
        created_at: { type: ["timestamp", null] },
        annee_naissance: { type: ["string", null] },
        type: { type: ["string", null] },
        date_nomination: { type: ["string", null] },
        status: { type: ["string", null] },
        date_fin_mesure: { type: ["date", null] },
        etablissement_id: { type: ["integer", null] },
        ti_id: { type: ["integer", null] },
        numero_dossier: { type: ["string", null] },
        cabinet: { type: ["string", null] },
        numero_rg: { type: ["string", null] },
        department_id: { type: ["integer", null] },
        antenne_id: { type: ["integer", null] },
        service_id: { type: ["integer", null] },
        is_urgent: { type: ["boolean", null] },
        judgment_date: { type: ["date", null] },
        latitude: { type: ["float", null] },
        longitude: { type: ["float", null] },
        pays: { type: ["string", null] },
        magistrat_id: { type: ["integer", null] },
        lieu_vie: { type: ["string", null] },
        type_etablissement: { type: ["string", null] },
        civilite: { type: ["string", null] },
        cause_sortie: { type: ["string", null] },
      },
    };
  }
}

module.exports = { Mesure };
