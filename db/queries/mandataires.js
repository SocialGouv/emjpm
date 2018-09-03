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
    })
    .first()
    .then(r => r.count);

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

const getMesuresMap = mandataireId =>
  knex("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal), array_agg('' || mesures.type || ' ' || mesures.annee || '')"
      ),
      "mesures.code_postal",
      knex.raw("COALESCE(geolocalisation_code_postal.latitude, 0) as latitude"),
      knex.raw(
        "COALESCE(geolocalisation_code_postal.longitude, 0) as longitude"
      )
    )
    .leftOuterJoin(
      "geolocalisation_code_postal",
      "mesures.code_postal",
      "geolocalisation_code_postal.code_postal"
    )
    .where({
      mandataire_id: parseInt(mandataireId),
      status: "Mesure en cours"
    })
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
    );

module.exports = {
  getCountMesures,
  updateCountMesures,
  updateDateMesureUpdate,
  getMandataireById,
  getMandataireByUserId,
  updateMandataire,
  getMesuresMap
};
