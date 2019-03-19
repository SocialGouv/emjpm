const knex = require("../knex.js");

function Commentaires() {
  return knex("commentaires");
}

const getAllCommentaires = (mandataire_id, ti_id) =>
  Commentaires().where({
    mandataire_id: parseInt(mandataire_id),
    ti_id: parseInt(ti_id)
  });

const addCommentaire = data => Commentaires().insert(data);

const deleteCommentaire = ({ id, ti_id }) =>
  Commentaires()
    .where({
      id: parseInt(id),
      ti_id
    })
    .del();

module.exports = {
  getAllCommentaires,
  addCommentaire,
  deleteCommentaire
};
