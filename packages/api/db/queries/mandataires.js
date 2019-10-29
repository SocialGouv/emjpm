const knex = require("../knex.js");
const { Department } = require("../../model/Departments");

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
const updateMandataire = async (id, data) => {
  if (data.code_postal) {
    const department = await Department.query()
      .where("code", data.code_postal.substring(0, 2))
      .limit(1)
      .first();

    data.department_id = department.id;
  }

  return knex("mandataires")
    .where({ id })
    .update(data);
};

// todo move to trigger/view
const updateCountMesures = id =>
  getCountMesures(id).then(count =>
    knex.raw(
      `UPDATE mandataires SET mesures_en_cours=${count} WHERE ID = ${id};`
    )
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
      "mesures.ville",
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
      "mesures.ville,mesures.code_postal,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
    )
    .orderBy("latitude", "asc");

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
      knex.raw("distinct ON(mandataires.id) mandataires.id"),
      "mandataires.*",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude",
      "users.type",
      "users.email",
      "users.nom",
      "users.prenom",
      "users.cabinet"
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
    .innerJoin("user_tis", "user_tis.user_id", "mandataires.user_id")
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mandataires.code_postal"
    )
    .groupBy(
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude",
      "mandataires.id",
      "users.type",
      "users.email",
      "users.nom",
      "users.prenom",
      "users.cabinet"
    );
  // .union(function() {
  //   this.select(
  //     knex.raw("distinct ON(mandataires.id) mandataires.id"),
  //     "mandataires.*",
  //     "geolocalisation_code_postal.latitude",
  //     "geolocalisation_code_postal.longitude",
  //     "users.type",
  //     "users.email",
  //     "users.nom",
  //     "users.prenom",
  //     "users.cabinet",
  //     "services.etablissement as service_etablissement",
  //     "services.nom as service_nom",
  //     "services.telephone as service_telephone",
  //     "services.prenom as service_prenom",
  //     "services.email as service_email",
  //     "services.dispo_max as service_dispo_max",
  //     "services.information as service_info"
  //   )
  //     .from("mandataires")
  //     .innerJoin("users", "mandataires.user_id", "users.id")
  //     .innerJoin("service_tis", "service_tis.mandataire_id", "mandataires.id")
  //     .innerJoin(
  //       "geolocalisation_code_postal",
  //       "geolocalisation_code_postal.code_postal",
  //       "mandataires.code_postal"
  //     )
  //     .leftOuterJoin("services", "users.service_id", "services.id")
  //     .where("users.type", "service")
  //     .where("service_tis.ti_id", parseInt(ti_id));
  // });
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
    )
    .orderBy("mandataires.id");

const getAllServicesByTis = ti_id =>
  knex
    .from("service_tis")
    .select("service_antenne.id", "service_antenne.*")
    .innerJoin(
      "service_antenne",
      "service_tis.antenne_id",
      "service_antenne.id"
    )
    .where({ ti_id: parseInt(ti_id) });

const mesureEnAttente = mandataireID =>
  knex("mesures")
    .count("*")
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en attente"
    })
    .first();

const update = (mandataireID, updates) =>
  Mandataires()
    .where("id", parseInt(mandataireID))
    .update(updates);

const isMandataireInTi = (mandataire_id, ti_id) =>
  knex
    .from("user_tis")
    .select(
      "mandataires.id",
      "mandataires.user_id",
      "user_tis.user_id",
      "user_tis.ti_id"
    )
    .innerJoin("mandataires", "mandataires.user_id", "user_tis.user_id")
    .where({
      "mandataires.id": mandataire_id,
      ti_id
    })
    .then(res => res.length > 0);

const getParentService = id =>
  knex("services")
    .select("services.*", "users.type", "users.id as userId")
    .innerJoin("users", "users.service_id", "services.id")
    .where({ "services.id": id })
    .first();

const updateService = (serviceId, updates) =>
  knex("services")
    .where("id", parseInt(serviceId))
    .update(updates);

const findMandataire = (req, params) => {
  return req.user.type === "service" || req.user.type === "ti"
    ? getMandataireById(params)
    : getMandataireByUserId(req.user.id);
};

module.exports = {
  isMandataireInTi,
  updateCountMesures,
  updateDateMesureUpdate,
  getMandataire,
  getMandataireById,
  updateMandataire,
  getMesuresMap,
  mesureEnAttente,
  getAllServicesByTis,
  getAllMandataires,
  getAllByMandatairesFilter,
  update,
  getMandataireByUserId,
  getParentService,
  updateService,
  findMandataire
};
