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
  return Mandataires().insert(data);
}

function getAllMandataires(ti_id) {
  return knex
    .from("mandatairetis")
    .where("ti_id", parseInt(ti_id))
    .innerJoin("mandataires", "mandatairetis.mandataire_id", "mandataires.id");
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

function getAllUsers() {
  return Users().select();
}

function getSingleUser(userID) {
  return Users()
    .where("id", parseInt(userID))
    .first();
}

function getAllCommentaire(mandataire_id, ti_id) {
  return Commentaires().where({
    mandataire_id: parseInt(mandataire_id),
    user_id: parseInt(ti_id)
  });
}

function addCommentaire(data) {
  return Commentaires().insert(data);
}
function deleteItem(showID) {
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

function getAllMesure(mandataire_id) {
  return knex("mesures").where("mandataire_id", parseInt(mandataire_id));
}

function addMesure(mesureID) {
  return knex("mesures").insert(mesureID);
}

function getSingleMesure(mesureID) {
  return knex("mesures")
    .where("id", parseInt(mesureID))
    .first();
}
function updateMesure(commentaireID, updates) {
  return knex("mesures")
    .where("id", parseInt(commentaireID))
    .update(updates);
}

function getAllServices(service_id) {
  return knex("mandataires").where("service_id", parseInt(service_id));
}

function getsingleUsers(email) {
  return knex("users").where("email", email);
}

module.exports = {
  getAllUsers,
  getAllMandataires,
  getAll,
  getSingle: getSingle,
  add: add,
  update: update,
  getsingleUsers: getsingleUsers,
  getAllCommentaire: getAllCommentaire,
  addCommentaire: addCommentaire,
  getSingleCommentaire: getSingleCommentaire,
  updateCommentaire: updateCommentaire,
  getAllMesure: getAllMesure,
  addMesure: addMesure,
  getSingleMesure: getSingleMesure,
  updateMesure: updateMesure,
  deleteItem: deleteItem,
  uploadAll: uploadAll,
  getSingleUser: getSingleUser,
  getAllServices: getAllServices,
  getTiByUserId
};
