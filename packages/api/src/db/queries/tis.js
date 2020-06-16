//1

const knex = require("../knex.js");

const getAllTisByMandataire = (mandataireId) =>
  knex("user_tis")
    .distinct("user_tis.ti_id")
    .select("tis.id", "tis.etablissement", "user_tis.ti_id")
    .innerJoin("tis", "user_tis.ti_id", "tis.id")
    .innerJoin("mandataires", "mandataires.user_id", "user_tis.user_id")
    .where({
      "mandataires.id": parseInt(mandataireId),
    });

// change mandataire_tis
//const addMandataireTis = data => knex("mandataire_tis").insert(data);

const findUserbymandataire = (mandataire_id) =>
  knex("mandataires").select("mandataires.user_id").where("id", mandataire_id);

const addMandataireTis = (ti_id, mandataire_id) =>
  knex("user_tis").insert({
    ti_id: ti_id,
    user_id: findUserbymandataire(mandataire_id),
  });

const deleteMandataireTis = (tiId, mandataireId) =>
  knex("user_tis")
    .innerJoin("mandataires", "mandataires.user_id", "user_tis.user_id")
    .where({
      ti_id: parseInt(tiId),
      user_id: findUserbymandataire(parseInt(mandataireId)),
    })
    .first()
    .del();

const getTis = () => knex("tis");

const getTiById = (tiId) =>
  knex("tis")
    .where({
      id: parseInt(tiId),
    })
    .first();

const getTiByUserId = (userId) =>
  knex("tis")
    .select(
      "tis.*",
      "users.cabinet",
      "users.email",
      "users.type",
      "users.last_login",
      "users.active",
      "users.reset_password_token",
      "users.reset_password_expires"
    )
    .innerJoin("user_tis", "user_tis.ti_id", "tis.id")
    .innerJoin("users", "user_tis.user_id", "users.id")
    .where("user_tis.user_id", Number(userId))
    .first();

const getTiByUserIdWithCodePostal = (userId) =>
  knex("tis")
    .select(
      "tis.id",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude",
      //adrien: for test
      "tis.code_postal",
      "tis.telephone"
    )
    .innerJoin("user_tis", "user_tis.ti_id", "tis.id")
    .innerJoin("users", "user_tis.user_id", "users.id")
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "tis.code_postal"
    )
    .where("user_tis.user_id", parseInt(userId))
    .first();

const getTisNames = async (tis) => {
  const getEtablissementByTi = (id) =>
    getTiById(id).then((json) => json.etablissement);
  if (tis) {
    const tiNames = (await Promise.all(tis.map(getEtablissementByTi))).join(
      ", "
    );
    return tiNames;
  }
};

module.exports = {
  getAllTisByMandataire,
  addMandataireTis,
  deleteMandataireTis,
  getTis,
  getTisNames,
  getTiByUserId,
  getTiByUserIdWithCodePostal,
  getTiById,
};
