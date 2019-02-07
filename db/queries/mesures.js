const knex = require("../knex.js");

const getAllMesuresByMandataires = ti_id =>
  knex
    .from("mesures")
    .where("status", "Mesure en cours")
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mesures.code_postal"
    )
    .innerJoin("users", "mandataires.user_id", "users.id")
    .innerJoin("user_tis", "user_tis.user_id", "users.id")
    .where({ "user_tis.ti_id": parseInt(ti_id), "users.active": true })
    .select(
      "mesures.id",
      "mesures.code_postal",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude",
      "users.nom",
      "users.prenom",
      "users.type",
      "mesures.date_ouverture",
      "mesures.ville"
    );

const getAllMesuresByMandatairesFilter = (
  ti_id,
  latnorthEast,
  latsouthWest,
  longNorthEast,
  longSouthWest
) =>
  knex
    .from("mesures")
    .select(
      knex.raw(
        "distinct ON(mandataires.id) mandataires.id,mandataires.*,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude,users.type,users.email,users.nom,users.prenom,users.cabinet"
      )
    )
    .where("status", "Mesure en cours")
    .whereBetween("geolocalisation_code_postal.latitude", [
      latsouthWest,
      latnorthEast
    ])
    .whereBetween("geolocalisation_code_postal.longitude", [
      longSouthWest,
      longNorthEast
    ])
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .innerJoin("user_tis", "user_tis.user_id", "users.id")
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mesures.code_postal"
    )
    .groupByRaw(
      "geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude,mandataires.id,users.type,users.email,users.nom,users.prenom,users.cabinet"
    )
    .where({ "user_tis.ti_id": parseInt(ti_id), "users.active": true })
    .union(function() {
      this.select(
        "mandataires.id",
        "mandataires.*",
        "geolocalisation_code_postal.latitude",
        "geolocalisation_code_postal.longitude",
        "users.type",
        "users.email",
        "users.nom",
        "users.prenom",
        "users.cabinet"
      )
        .from("mandataires")
        .innerJoin("users", "mandataires.user_id", "users.id")
        .innerJoin("user_tis", "user_tis.user_id", "users.id")
        .innerJoin(
          "geolocalisation_code_postal",
          "geolocalisation_code_postal.code_postal",
          "mandataires.code_postal"
        )
        .where("users.type", "service")
        .where("user_tis.ti_id", parseInt(ti_id));
    });

// bulk insert some data and prevent mesure.numero_dossier duplicates
const bulk = ({ mesures, mandataire_id }) => {
  return knex.transaction(trx => {
    const mesureExist = async numero_dossier =>
      (await knex("mesures")
        .where({ mandataire_id, numero_dossier: numero_dossier })
        .count())[0].count > 0;
    const loadMesure = async (mesure, i) => {
      if (
        mesure.numero_dossier &&
        mesure.numero_dossier.toString().trim().length
      ) {
        // skip duplicates numero_dossier
        if (await mesureExist(mesure.numero_dossier)) {
          return Promise.resolve(`Ligne ${i + 2} : SKIP`);
        }
      }
      return trx("mesures")
        .insert(mesure)
        .then(() => `Ligne ${i + 2} : OK`);
    };
    return Promise.all(mesures.map(loadMesure));
  });
};

//TODO(Adrien) : see where it was used and rm if necessary
// async function getAllMesuresByMandatairesFilter(
//     ti_id,
//     latnorthEast,
//     latsouthWest,
//     longNorthEast,
//     longSouthWest
// ) {
//     const mesuresTiQuery = knex
//         .from("mesures")
//         .select(
//             knex.raw("distinct ON(mandataires.id) mandataires.id, mandataires.*"),
//             knex.raw("COALESCE(geolocalisation_code_postal.latitude, 0) as latitude"),
//             knex.raw(
//                 "COALESCE(geolocalisation_code_postal.longitude, 0) as longitude"
//             )
//         )
//         .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
//         .innerJoin(
//             "mandataire_tis",
//             "mandataire_tis.mandataire_id",
//             "mandataires.id"
//         )
//         .innerJoin(
//             "geolocalisation_code_postal",
//             "geolocalisation_code_postal.code_postal",
//             "mesures.code_postal"
//         )
//         .innerJoin("users", "users.id", "mandataires.user_id")
//         .where({ "mandataire_tis.ti_id": parseInt(ti_id) })
//         .groupByRaw(
//             "geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude,mandataires.id"
//         );
//
//     const allMesures = await mesuresTiQuery
//         .clone()
//         .where(builder =>
//             builder
//                 .whereBetween("geolocalisation_code_postal.latitude", [
//                     latsouthWest,
//                     latnorthEast
//                 ])
//                 .whereBetween("geolocalisation_code_postal.longitude", [
//                     longSouthWest,
//                     longNorthEast
//                 ])
//                 .whereNot({ "users.type": "service" })
//         )
//         .orWhere({
//             "users.type": "service"
//         });
//     return allMesures;
// }

const getMesuresByGeolocalisation = (ti_id, type) => {
  const where = {
    "user_tis.ti_id": parseInt(ti_id),
    "users.active": true,
    status: "Mesure en cours"
  };
  if (type) {
    where["users.type"] = type;
  }
  return knex
    .from("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal),array_agg(distinct mesures.mandataire_id) as mandataire_ids,array_agg(distinct users.type) as types"
      ),
      "mesures.code_postal",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "mesures.code_postal",
      "geolocalisation_code_postal.code_postal"
    )
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .innerJoin("user_tis", "user_tis.user_id", "users.id")
    .where(where)
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.longitude,geolocalisation_code_postal.latitude,users.type"
    );
};

const getAllMesuresByTis = ti_id =>
  knex
    .from("mesures")
    .select("mesures.*", knex.raw("mandataires.etablissement as manda"))
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .innerJoin("user_tis", "user_tis.user_id", "users.id")
    .where({
      "user_tis.ti_id": parseInt(ti_id),
      "users.active": true,
      "mesures.status": "Mesure en attente"
    });

const getAllMesuresByPopUpForMandataire = ti_id =>
  knex
    .from("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal), array_agg('' || mesures.type || ' ' || mesures.annee ||'')"
      ),
      "mesures.code_postal",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude",
      "users.type"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "mesures.code_postal",
      "geolocalisation_code_postal.code_postal"
    )
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .innerJoin("user_tis", "user_tis.user_id", "users.id")
    .where({
      "user_tis.ti_id": parseInt(ti_id),
      status: "Mesure en cours",
      "users.active": true
    })
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.longitude,geolocalisation_code_postal.latitude,geolocalisation_code_postal.code_postal"
    );

const updateMesure = (where, updates) =>
  knex("mesures")
    .where(where)
    .update(updates);

const addMesure = data => knex("mesures").insert(data);

const getMesuresEnCoursMandataire = mandataireID =>
  knex("mesures").where({
    mandataire_id: parseInt(mandataireID),
    status: "Mesure en cours"
  });

const getAllMesuresAttente = mandataireID =>
  knex("mesures")
    .select("mesures.*", "tis.etablissement")
    .leftOuterJoin("tis", "mesures.ti_id", "tis.id")
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en attente"
    });

const getAllMesuresEteinte = mandataireID =>
  knex("mesures").where({
    mandataire_id: parseInt(mandataireID),
    status: "Eteindre mesure"
  });

module.exports = {
  getAllMesuresByMandataires,
  getAllMesuresByMandatairesFilter,
  getMesuresByGeolocalisation,
  getAllMesuresByTis,
  getAllMesuresByPopUpForMandataire,
  updateMesure,
  getAllMesuresEteinte,
  getAllMesuresAttente,
  getMesuresEnCoursMandataire,
  addMesure,
  bulk
};
