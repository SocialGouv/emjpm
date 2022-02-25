const { Mesure } = require("~/models");
const { MesureEtat } = require("~/models");
const getGeoDatas = require("~/services/getGeoDatas");
const getDepartement = require("~/services/getDepartement");

module.exports = async function updateCurrentDataOfMesure(mesureId) {
  const {
    nature_mesure,
    champ_mesure,
    lieu_vie,
    ville,
    code_postal,
    pays,
    date_changement_etat,
  } = await MesureEtat.query()
    .findOne({ mesure_id: mesureId })
    .orderBy("date_changement_etat", "desc");

  const geodata = (await getGeoDatas(code_postal, ville)) || {};
  const departement = code_postal ? await getDepartement(code_postal) : {};

  const { nature_mesure: natureOrigin, champ_mesure: champOrigin } =
    await Mesure.query().findOne({ id: mesureId });

  const updateFields = {
    champ_mesure,
    code_postal,
    departement_code: departement.id,
    latitude: geodata.latitude,
    lieu_vie,
    longitude: geodata.longitude,
    nature_mesure,
    pays,
    ville,
  };
  if (natureOrigin !== nature_mesure || champOrigin !== champ_mesure) {
    updateFields.date_protection_en_cours = date_changement_etat;
  }

  await Mesure.query().update(updateFields).where({ id: mesureId });
};
