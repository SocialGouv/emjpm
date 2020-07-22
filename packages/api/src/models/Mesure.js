const { Model } = require("objection");

const knexConnection = require("../db/knex");
const { MesureEtat } = require("./MesureEtat");
const { MesureRessources } = require("./MesureRessources");
const { Service } = require("./Service");

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
      service: {
        relation: Model.HasOneRelation,
        modelClass: Service,
        join: {
          from: "mesures.service_id",
          to: "services.id",
        },
      },
      etats: {
        relation: Model.HasManyRelation,
        modelClass: MesureEtat,
        join: {
          from: "mesures.id",
          to: "mesure_etat.mesure_id",
        },
      },
      ressources: {
        relation: Model.HasManyRelation,
        modelClass: MesureRessources,
        join: {
          from: "mesures.id",
          to: "mesure_ressources.mesure_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        annee_naissance: { type: ["string", null] },
        antenne_id: { type: ["integer", null] },
        cabinet: { type: ["string", null] },
        cause_sortie: { type: ["string", null] },
        champ_mesure: { type: ["string", null] },
        civilite: { type: ["string", null] },
        code_postal: { type: ["string", null] },
        created_at: { type: "timestamptz" },
        date_fin_mesure: { type: ["string", null] },
        date_nomination: { type: "string" },
        date_premier_mesure: { type: ["string", null] },
        date_protection_en_cours: { type: ["string", null] },
        department_id: { type: ["integer", null] },
        etablissement: { type: ["string", null] },
        etablissement_id: { type: ["integer", null] },
        id: { type: "integer" },
        is_urgent: { type: ["boolean", null] },
        judgment_date: { type: ["string", null] },
        latitude: { type: ["number", null] },
        lieu_vie: { type: ["string", null] },
        longitude: { type: ["number", null] },
        magistrat_id: { type: ["integer", null] },
        mandataire_id: { type: ["integer", null] },
        nature_mesure: { type: ["string", null] },
        numero_dossier: { type: ["string", null] },
        numero_rg: { type: ["string", null] },
        pays: { type: "string" },
        service_id: { type: ["integer", null] },
        status: { type: ["string", null] },
        ti_id: { type: ["integer", null] },
        type_etablissement: { type: ["string", null] },
        ville: { type: ["string", null] },
        resultat_revision: { type: ["string", null] },
      },
    };
  }
}

module.exports = { Mesure };
