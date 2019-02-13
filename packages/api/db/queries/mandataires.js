const knex = require("../knex.js");
//const whitelist = require("./whitelist");

//const ALLOWED_FILTERS = ["users.active", "users.type"];

// nombre de mesures pour le mandataire
const Mandataires = () => knex("mandataires");

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
    knex.raw(`UPDATE mandataires
      SET mesures_en_cours = ${count}
      WHERE ID = ${id};`)
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
      "users.type",
      "users.nom",
      "users.prenom",
      "users.email",
      knex.raw("COALESCE(geolocalisation_code_postal.latitude, 0) as latitude"),
      knex.raw(
        "COALESCE(geolocalisation_code_postal.longitude, 0) as longitude"
      )
    )
    .leftOuterJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mandataires.code_postal"
    )
    .innerJoin("users", "mandataires.user_id", "users.id")
    .where(filters)
    .first();

const getMandataireById = id =>
  getMandataire({ "mandataires.id": id, "users.active": true });

const getMandataireByUserId = user_id =>
  getMandataire({
    "mandataires.user_id": parseInt(user_id),
    "users.active": true
  });

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
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .where({
      mandataire_id: parseInt(mandataireId),
      status: "Mesure en cours",
      "users.active": true
    })
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
    );

function getAllByMandatairesFilter(
  ti_id,
  latnorthEast,
  latsouthWest,
  longNorthEast,
  longSouthWest
) {
  return knex
    .from("mandataires")
    .select(
      knex.raw(
        "distinct ON(mandataires.id) mandataires.id,mandataires.*,users.type,users.nom,users.prenom,users.email"
      ),
      knex.raw("COALESCE(geolocalisation_code_postal.latitude, 0) as latitude"),
      knex.raw(
        "COALESCE(geolocalisation_code_postal.longitude, 0) as longitude"
      )
    )
    .where({ "user_tis.ti_id": parseInt(ti_id), "users.active": true })
    .where(builder =>
      builder
        .whereBetween("geolocalisation_code_postal.latitude", [
          latsouthWest,
          latnorthEast
        ])
        .whereBetween("geolocalisation_code_postal.longitude", [
          longSouthWest,
          longNorthEast
        ])
    )
    .innerJoin("users", "users.id", "mandataires.user_id")
    .innerJoin("user_tis", "users.id", "mandataires.user_id")
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mandataires.code_postal"
    )
    .groupByRaw(
      "mandataires.id,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude,users.type,users.nom,users.prenom,users.email"
    );
}

const getAllMandataires = ti_id =>
  knex
    .from("user_tis")
    .where("ti_id", parseInt(ti_id))
    .innerJoin("mandataires", "user_tis.user_id", "mandataires.user_id")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .select(
      knex.raw(
        "distinct mandataires.*,users.type,users.nom,users.prenom,users.email"
      ),
      knex.raw("COALESCE(geolocalisation_code_postal.latitude, 0) as latitude"),
      knex.raw(
        "COALESCE(geolocalisation_code_postal.longitude, 0) as longitude"
      )
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mandataires.code_postal"
    );

const getAllServicesByTis = ti_id =>
  knex
    .from("user_tis")
    .innerJoin("mandataires", "user_tis.user_id", "mandataires.user_id")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .where({ ti_id: parseInt(ti_id), "users.type": "service" });

const mesureEnAttente = mandataireID =>
  knex("mesures")
    .count("*")
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en attente"
    });

const update = (mandataireID, updates) =>
  Mandataires()
    .where("id", parseInt(mandataireID))
    .update(updates);

const getCoordonneesByPostCode = codePostal =>
  knex
    .from("geolocalisation_code_postal")
    .where("code_postal", codePostal)
    .first();

module.exports = {
  updateCountMesures,
  updateDateMesureUpdate,
  getMandataireById,
  getMandataireByUserId,
  updateMandataire,
  getMesuresMap,
  mesureEnAttente,
  getAllServicesByTis,
  getAllMandataires,
  getAllByMandatairesFilter,
  update,
  getCoordonneesByPostCode
};
