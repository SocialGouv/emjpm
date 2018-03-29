var knex = require('./knex.js');

function Mandataires() {
    return knex('mandataires');
}

function Commentaires() {
    return knex('commentaires');
}

function Users() {
    return knex('users');
}

// *** queries *** //

function getAll() {
    return Mandataires().select();
}

function add(show) {
    return Mandataires().insert(show, 'id');
}

function getSingle(mandataireID) {
    return Mandataires().where('id', parseInt(mandataireID)).first();
}
function update(showID, updates) {
    return Mandataires().where('id', parseInt(showID)).update(updates);
}


function getAllUsers() {
    return Users().select();
}


function getAllCommentaire() {
    return Commentaires().select();
}

function addCommentaire(commentaireID) {
    return Commentaires().insert(commentaireID, 'id');
}

function getSingleCommentaire(commentaireID) {
    return Commentaires().where('id', parseInt(commentaireID)).first();
}
function updateCommentaire(commentaireID, updates) {
    return Commentaires().where('id', parseInt(commentaireID)).update(updates);
}


function getAllMesure() {
    return Commentaires().select();
}

function addMesure(commentaireID) {
    return Commentaires().insert(commentaireID, 'id');
}

function getSingleMesure(commentaireID) {
    return Commentaires().where('id', parseInt(commentaireID)).first();
}
function updateMesure(commentaireID, updates) {
    return Commentaires().where('id', parseInt(commentaireID)).update(updates);
}

module.exports = {
    getAllUsers: getAllUsers,
    getAll: getAll,
    getSingle: getSingle,
    add: add,
    update: update,
    getAllCommentaire: getAllCommentaire,
    addCommentaire: addCommentaire,
    getSingleCommentaire: getSingleCommentaire,
    updateCommentaire: updateCommentaire,
    getAllMesure: getAllMesure,
    addMesure: addMesure,
    getSingleMesure: getSingleMesure,
    updateMesure: updateMesure
};