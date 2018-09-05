const knex = require("../knex.js");

const getAllEtablissementsByMandataire = mandataireId =>
  knex("mandataire_etablissements")
    .select(
      "mandataire_etablissements.id",
      "mandataire_etablissements.etablissement_id",
      "etablissements.nom"
    )
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

const addMandataireToEtablissement = mandataireId =>
  knex("mandataire_etablissements").insert(mandataireId);

const deleteMandataireEtablissement = showID =>
  knex("mandataire_etablissements")
    .where("id", parseInt(showID))
    .del();

const getEtablissements = () =>
  knex("etablissements")
    .whereBetween("code_postal", [59000, 59999])
    .orWhereBetween("code_postal", [60000, 60999])
    .orWhereBetween("code_postal", [62000, 62999])
    .orWhereBetween("code_postal", [80000, 80999])
    .orWhereBetween("code_postal", [2000, 2999]);
//TODO refactor with Likes '%...'

module.exports = {
  getAllEtablissementsByMandataire,
  addMandataireToEtablissement,
  deleteMandataireEtablissement,
  getEtablissements
};
