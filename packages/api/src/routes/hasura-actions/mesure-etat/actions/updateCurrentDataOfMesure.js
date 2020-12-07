const { Mesure } = require("../../../../models/Mesure");
const { MesureEtat } = require("../../../../models/MesureEtat");
const getGeoDatas = require("../../../../services/getGeoDatas");
const getDepartement = require("../../../../services/getDepartement");

module.exports = async function updateCurrentDataOfMesure(mesureId) {
  const {
    nature_mesure,
    champ_mesure,
    lieu_vie,
    ville,
    code_postal,
  } = await MesureEtat.query()
    .findOne({ mesure_id: mesureId })
    .orderBy("date_changement_etat", "desc");

  const geodata = (await getGeoDatas(code_postal, ville)) || {};
  const departement = (await getDepartement(code_postal)) || {};

  await Mesure.query()
    .update({
      champ_mesure,
      code_postal,
      department_id: departement.id,
      latitude: geodata.latitude,
      lieu_vie,
      longitude: geodata.longitude,
      nature_mesure,
      ville,
    })
    .where({ id: mesureId });
};
