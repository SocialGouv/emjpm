var knex = require("./knex.js");

function Mandataires() {
  return knex("mandataires");
}

function Commentaires() {
  return knex("commentaires");
}

function Users() {
  return knex("users");
}

// *** queries *** //

function getAll() {
  return Mandataires().select();
}

function uploadAll(data) {
  return knex("mesures").insert(data);
}

function getAllMandataires(ti_id) {
  return knex
    .from("mandataire_tis")
    .where("ti_id", parseInt(ti_id))
    .innerJoin("mandataires", "mandataire_tis.mandataire_id", "mandataires.id");
}

function getMandataires(ti_id) {
  return knex.from("mandataires");
}

function getAllServicesByTis(ti_id) {
  return knex
    .from("mandataire_tis")
    .where({ ti_id: parseInt(ti_id), type: "Service" })
    .innerJoin("mandataires", "mandataire_tis.mandataire_id", "mandataires.id");
}
// function getAllMesuresByPopUp(code_postal) {
//     return knex
//         .from("mesures")
//         .where("code_postal", parseInt(code_postal))
//         .innerJoin("mandataires", "mesures.mandataire_id", "mandataires.id");
// }

function getAllMesures(mandataireID) {
  return knex("mesures").where({
    mandataire_id: parseInt(mandataireID),
    status: "Mesure en cours"
  });
}

function getAllMesuresEteinte(mandataireID) {
  return knex("mesures").where({
    mandataire_id: parseInt(mandataireID),
    status: "Eteindre mesure"
  });
}

function getAllMesuresByMandataires(ti_id) {
  return knex
    .from("mesures")
    .where("status", "Mesure en cours")
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("mandataire_tis", "mandataire_tis.mandataire_id", "mandataires.id")
    .where("mandataire_tis.ti_id", parseInt(ti_id))
    .select(
      "mesures.id",
      "mesures.code_postal",
      "mesures.latitude",
      "mesures.longitude",
      "mandataires.nom",
      "mandataires.prenom",
      "mandataires.type",
      "mesures.date_ouverture",
      "mesures.ville"
    );
}

function getAllMesuresByMandatairesFilter(
  ti_id,
  latnorthEast,
  latsouthWest,
  longNorthEast,
  longSouthWest
) {
  return knex
    .from("mesures")
    .where("status", "Mesure en cours")
    .whereBetween("mesures.latitude", [latsouthWest, latnorthEast])
    .whereBetween("mesures.longitude", [longSouthWest, longNorthEast])
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("mandataire_tis", "mandataire_tis.mandataire_id", "mandataires.id")
    .groupByRaw("mandataires.id")
    .where("mandataire_tis.ti_id", parseInt(ti_id))
    .select("mandataires.id", "mandataires.*");
}

function getAllByMandatairesFilter(
  ti_id,
  latnorthEast,
  latsouthWest,
  longNorthEast,
  longSouthWest
) {
  return knex
    .from("mandataires")
    .whereBetween("mandataires.latitude", [latsouthWest, latnorthEast])
    .whereBetween("mandataires.longitude", [longSouthWest, longNorthEast])
    .innerJoin("mandataire_tis", "mandataire_tis.mandataire_id", "mandataires.id")
    .groupByRaw("mandataires.id")
    .where("mandataire_tis.ti_id", parseInt(ti_id))
    .select("mandataires.id", "mandataires.*");
}

function getCoordonneByPosteCode(userId) {
  return knex
    .from("geolocalisation_code_postal")
    .debug()
    .where("code_postal", userId)
    .first();
}

function getAllMesuresByPopUp(ti_id) {
  return knex
    .from("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal),array_agg(distinct mesures.mandataire_id)"
      ),
      "mesures.code_postal",
      "v1.latitude",
      "v1.longitude"
    )
    .innerJoin(
      "geolocalisation_code_postal as v1",
      "mesures.code_postal",
      "v1.code_postal"
    )
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("mandataire_tis", "mandataire_tis.mandataire_id", "mandataires.id")
    .where({
      "mandataire_tis.ti_id": parseInt(ti_id),
      status: "Mesure en cours"
    })
    .groupByRaw("mesures.code_postal,v1.longitude,v1.latitude,v1.code_postal");
}

function getAllMesuresByMandatairesForMaps(mandataireID) {
  return knex("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal), array_agg('' || mesures.type || ' ' || mesures.annee ||'')"
      ),
      "mesures.code_postal",
      "mesures.latitude",
      "mesures.longitude"
    )
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en cours"
    })
    .groupByRaw("mesures.code_postal,mesures.longitude,mesures.latitude");
}

function getAllMesuresByPopUpForMandataire(ti_id) {
  return knex
    .from("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal), array_agg('' || mesures.type || ' ' || mesures.annee ||'')"
      ),
      "mesures.code_postal",
      "v1.latitude",
      "v1.longitude"
    )
    .innerJoin(
      "geolocalisation_code_postal as v1",
      "mesures.code_postal",
      "v1.code_postal"
    )
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin("mandataire_tis", "mandataire_tis.mandataire_id", "mandataires.id")
    .where({
      "mandataire_tis.ti_id": parseInt(ti_id),
      status: "Mesure en cours"
    })
    .groupByRaw("mesures.code_postal,v1.longitude,v1.latitude,v1.code_postal");
}

function getPostecode(codePostal, lat, lng) {
  return knex("geolocalisation_code_postal").insert({
    code_postal: codePostal,
    latitude: lat,
    longitude: lng
  });
}

function getMandataireByUserId(userId) {
  return knex
    .from("mandataires")
    .where("user_id", parseInt(userId))
    .first();
}

function add(mandataire) {
  return Mandataires().insert(madataire);
}

function getSingle(mandataireID) {
  return Mandataires()
    .where("id", parseInt(mandataireID))
    .first();
}

function getSingleDisponibilite(mandataireID) {
  return Mandataires()
    .select("mesures_en_cours")
    .where("id", parseInt(mandataireID))
    .first();
}

function getTiByUserId(userId) {
  return knex
    .from("tis")
    .where("user_id", parseInt(userId))
    .first();
}

function update(mandataireID, updates) {
  return Mandataires()
    .where("id", parseInt(mandataireID))
    .update(updates);
}
function deleteMesure(showID) {
  return knex("mesures")
    .where("id", parseInt(showID))
    .del();
}

function getAllUsers() {
  return Users().select();
}

function getSingleUser(userID) {
  return Users()
    .where("id", parseInt(userID))
    .first();
}

function getAllCommentaires(mandataire_id, ti_id) {
  return Commentaires().where({
    mandataire_id: parseInt(mandataire_id),
    ti_id: parseInt(ti_id)
  });
}

function addCommentaire(data) {
  return Commentaires().insert(data);
}
function deleteCommentaire(showID) {
  return Commentaires()
    .where("id", parseInt(showID))
    .del();
}

function getSingleCommentaire(commentaireID) {
  return Commentaires()
    .where("id", parseInt(commentaireID))
    .first();
}
function updateCommentaire(commentaireID, updates) {
  return Commentaires()
    .where("id", parseInt(commentaireID))
    .update(updates);
}

function getAllMesure(mandataire__id) {
  return knex("mesures").where("mandataire_id", parseInt(mandataire__id));
}

// nb de mesures en cours
function CapaciteMandataire(mandataireID) {
  return knex("mesures")
    .count("*")
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en cours"
    });
}

function CapaciteEteinteMandataire(mandataireID) {
  return knex("mesures")
    .count("*")
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Eteindre mesure"
    });
}

function addMesure(data) {
  return knex("mesures").insert(data);
}

function getSingleMesure(mesureID) {
  return knex("mesures")
    .where("id", parseInt(mesureID))
    .first();
}
function updateMesure(where, updates) {
  return knex("mesures")
    .where(where)
    .update(updates);
}

function getsingleUsers(email) {
  return knex("users").where("email", email);
}

function getAllEtablissement(mandataireId) {
  return knex("EtablissementPreposes").where({
    mandataire_id: parseInt(mandataireId)
  });
}

function getEtablissements() {
  return knex("etablissements")
    .whereBetween("code_postal", [59000, 59999])
    .orWhereBetween("code_postal", [60000, 60999])
    .orWhereBetween("code_postal", [62000, 62999])
    .orWhereBetween("code_postal", [80000, 80999])
    .orWhereBetween("code_postal", [2000, 2999]);
  //TODO refactor with Likes '%...'
}

function getTis() {
  return knex("tis");
}

function getAllEtablissementsByMandataire(mandataireId) {
  return knex("mandataire_etablissements")
    .select("mandataire_etablissements.id", "etablissements.nom")
    .innerJoin(
      "mandataires",
      "mandataires.id",
      "mandataire_etablissements.mandataire_id"
    )
    .innerJoin(
      "etablissements",
      "mandataire_etablissements.etablissement_id",
      "etablissements.id"
    )
    .where({
      mandataire_id: parseInt(mandataireId)
    });
}

function getAllTisByMandataire(mandataireId) {
  return knex("mandataire_tis")
    .select("tis.id", "tis.etablissement")
    .where({
      mandataire_id: parseInt(mandataireId)
    })
    .innerJoin("tis", "mandataire_tis.ti_id", "tis.id");
}

function addEtablissement(mandataireId) {
  return knex("EtablissementPreposes").insert(mandataireId);
}

function addMandataireToEtablissement(mandataireId) {
  return knex("mandataire_etablissements").insert(mandataireId);
}

function addMandataireTis(data) {
  return knex("mandataire_tis").insert(data);
}

function updateEtablissement(mesureID, updates) {
  return knex("EtablissementPreposes")
    .where("id", parseInt(mesureID))
    .update(updates);
}
function deleteEtablissement(showID) {
  return knex("EtablissementPreposes")
    .where("id", parseInt(showID))
    .del();
}
function deleteMandataireEtablissement(showID) {
  return knex("mandataire_etablissements")
    .where("id", parseInt(showID))
    .del();
}

function deleteMandataireTis(tiId,mandataireId) {
  return knex("mandataire_tis")
    .where({ti_id: parseInt(tiId),mandataire_id: parseInt(mandataireId) }).first()
    .del();
}

function getAllAntennes(mandataireId) {
  return knex("service-antennes").where({
      mandataire_id: parseInt(mandataireId)
  });
}

function addAntenne(mandataireId) {
  return knex("service-antennes").insert(mandataireId);
}

function updateAntenne(mesureID, updates) {
  return knex("service-antennes")
    .where("id", parseInt(mesureID))
    .update(updates);
}

function deleteAntenne(where) {
  return knex("service-antennes")
    .where(where)
    .del();
}

const isMandataireInTi = (mandataire_id, ti_id) =>
  knex
    .from("mandataire_tis")
    .where({
      mandataire_id,
      ti_id
    })
    .then(res => res.length > 0);

module.exports = {
  getAllUsers,
  getAllMandataires,
  getAll,
  getSingle: getSingle,
  add: add,
  update: update,
  getsingleUsers: getsingleUsers,
  getAllCommentaires: getAllCommentaires,
  addCommentaire: addCommentaire,
  getSingleCommentaire: getSingleCommentaire,
  updateCommentaire: updateCommentaire,
  getAllMesure: getAllMesure,
  addMesure: addMesure,
  getSingleMesure: getSingleMesure,
  updateMesure: updateMesure,
  deleteCommentaire: deleteCommentaire,
  uploadAll: uploadAll,
  getSingleUser: getSingleUser,
  getAllServices: getAllServices,
  getTiByUserId,
  getAllMesuresByMandataires,
  getAllMesures,
  getMandataireByUserId,
  deleteMesure,
  CapaciteMandataire,
  getAllMesuresByPopUp,
  getPostecode,
  deleteEtablissement,
  updateEtablissement,
  addEtablissement,
  getAllEtablissement,
  getAllAntennes,
  addAntenne,
  updateAntenne,
  deleteAntenne,
  CapaciteEteinteMandataire,
  getAllMesuresEteinte,
  getAllMesuresByMandatairesFilter,
  getCoordonneByPosteCode,
  getAllByMandatairesFilter,
  isMandataireInTi,
  getSingleDisponibilite,
  addMandataireToEtablissement,
  getAllEtablissementsByMandataire,
  deleteMandataireEtablissement,
  getEtablissements,
  getAllTisByMandataire,
  getTis,
  addMandataireTis,
  deleteMandataireTis,
  getAllServicesByTis,
  getAllMesuresByPopUpForMandataire,
  getAllMesuresByMandatairesForMaps,
  getMandataires
};
