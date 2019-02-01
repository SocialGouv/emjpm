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
    .from("mandatairetis")
    .where("ti_id", parseInt(ti_id))
    .innerJoin("mandataires", "mandatairetis.mandataire_id", "mandataires.id");
}

// function getAllMesuresByPopUp(code_postal) {
//     return knex
//         .from("mesures")
//         .where("code_postal", parseInt(code_postal))
//         .innerJoin("mandataires", "mesures.mandataire_id", "mandataires.id");
// }

function getAllMesures(mandataireID) {
    return knex("mesures")
        .where({"mandataire_id": parseInt(mandataireID),status: 'Mesure en cours'});
}

function getAllMesuresEteinte(mandataireID) {
    return knex("mesures")
        .where({"mandataire_id": parseInt(mandataireID),status: 'Eteindre mesure'});
}

function getAllMesuresByMandataires(ti_id) {
    return knex.from("mesures")
        .where("status" , "Mesure en cours")
        .innerJoin("mandataires","mandataires.id","mesures.mandataire_id")
        .innerJoin("mandatairetis", "mandatairetis.mandataire_id", "mandataires.id").where("mandatairetis.ti_id", parseInt(ti_id)).select('mesures.id','mesures.code_postal','mesures.latitude', 'mesures.longitude', 'mandataires.nom','mandataires.prenom','mandataires.type','mesures.date_ouverture','mesures.ville');
}

function getAllMesuresByPopUp(ti_id) {
    return knex.from("mesures").debug().select(knex.raw('COUNT(mesures.code_postal)','mesures.code_postal','codePostalLatLngs.latitude','codePostalLatLngs.longitude'))
        .innerJoin("codePostalLatLngs","mesures.code_postal","codePostalLatLngs.code_postal")
        .innerJoin("mandataires","mandataires.id","mesures.mandataire_id")
        .innerJoin("mandatairetis", "mandatairetis.mandataire_id", "mandataires.id").where("mandatairetis.ti_id", parseInt(ti_id)).where({status: "Mesure en cours"}).groupByRaw('mesures.code_postal,codePostalLatLngs.longitude,codePostalLatLngs.latitude,codePostalLatLngs.code_postal');
}


function getPostecode(codePostal,lat,lng) {
    return knex("codePostalLatLngs").insert({code_postal: codePostal,latitude: lat, longitude: lng});
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
    .where("co_id", parseInt(showID))
    .del();
}

function getSingleCommentaire(commentaireID) {
  return Commentaires()
    .where("co_id", parseInt(commentaireID))
    .first();
}
function updateCommentaire(commentaireID, updates) {
  return Commentaires()
    .where("co_id", parseInt(commentaireID))
    .update(updates);
}

function getAllMesure(mandataire__id) {
  return knex("mesures").where("mandataire_id", parseInt(mandataire__id));
}

function CapaciteMandataire(mandataireID) {
    return knex("mesures").count('*').where({"mandataire_id": parseInt(mandataireID),status: 'Mesure en cours'});
}

function CapaciteEteinteMandataire(mandataireID) {
    return knex("mesures").count('*').where({"mandataire_id": parseInt(mandataireID),status: 'Eteindre mesure'});
}

function addMesure(mesureID) {
  return knex("mesures").insert(mesureID);
}

function getSingleMesure(mesureID) {
  return knex("mesures")
    .where("id", parseInt(mesureID))
    .first();
}
function updateMesure(mesureID, updates) {
  return knex("mesures")
    .where("id", parseInt(mesureID))
    .update(updates);
}

function getAllServices(service_id) {
  return knex("mandataires").where("service_id", parseInt(service_id));
}

function getsingleUsers(email) {
  return knex("users").where("email", email);
}

function getAllEtablissement(mandataireId) {
    return knex("EtablissementPreposes").where({
        mandataire_id: parseInt(mandataireId),
    });
}

function addEtablissement(mandataireId) {
    return knex("EtablissementPreposes").insert(mandataireId)
    };


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

function getAllAntennes(mandataireId) {
    return knex("serviceAntennes").where({
        service_id: parseInt(mandataireId),
    });
}

function addAntenne(mandataireId) {
    return knex("serviceAntennes").insert(mandataireId);
}
function updateAntenne(mesureID, updates) {
    return knex("serviceAntennes")
        .where("id", parseInt(mesureID))
        .update(updates);
}
function deleteAntenne(showID) {
    return knex("serviceAntennes").debug()
        .where("id", parseInt(showID))
        .del();
}

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
    getAllMesuresEteinte

};
