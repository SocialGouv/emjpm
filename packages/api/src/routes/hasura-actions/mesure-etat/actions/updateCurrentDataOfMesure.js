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
  } = await MesureEtat.query()
    .findOne({ mesure_id: mesureId })
    .orderBy("date_changement_etat", "desc");

  const geodata = (await getGeoDatas(code_postal, ville)) || {};
  const departement = code_postal ? await getDepartement(code_postal) : {};

  await Mesure.query()
    .update({
      champ_mesure,
      code_postal,
      department_id: departement.id,
      latitude: geodata.latitude,
      lieu_vie,
      longitude: geodata.longitude,
      nature_mesure,
      pays,
      ville,
    })
    .where({ id: mesureId });
};
