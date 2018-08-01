const knex = require("../knex.js");
//const whitelist = require("./whitelist");

//const ALLOWED_FILTERS = ["users.active", "users.type"];

// nombre de mesures pour le mandataire
const getCountMesures = (id, filters = { status: "Mesure en cours" }) =>
  knex("mesures")
    .count("*")
    .where({
      mandataire_id: parseInt(id),
      ...filters
    });

// update mandataire data
const updateMandataire = (id, data) =>
  knex("mandataires")
    .where({ id })
    .update(data);

// todo move to trigger/view
const updateCountMesures = id =>
  getCountMesures(id).then(count =>
    knex("mandataires")
      .where({ id })
      .update({
        mesures_en_cours: count
      })
  );

// todo move to trigger/view
const updateDateMesureUpdate = id =>
  knex("mandataires")
    .where({ id })
    .update({
      date_mesure_update: new Date()
    });

const getMandataire = filters =>
  knex("mandataires")
    .select(
      "mandataires.*",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mandataires.code_postal"
    )
    .where(filters)
    .first();

const getMandataireById = id => getMandataire({ "mandataires.id": id });

const getMandataireByUserId = user_id =>
  getMandataire({ "mandataires.user_id": user_id });

module.exports = {
  getCountMesures,
  updateCountMesures,
  updateDateMesureUpdate,
  getMandataireById,
  getMandataireByUserId,
  updateMandataire
};
