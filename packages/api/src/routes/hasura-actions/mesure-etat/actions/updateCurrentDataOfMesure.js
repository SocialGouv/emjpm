const { Mesure } = require("~/models");
const { MesureEtat } = require("~/models");
const getGeoDatas = require("~/services/getGeoDatas");
const getDepartement = require("~/services/getDepartement");

module.exports = async function updateCurrentDataOfMesure(mesureId) {
  const mesureEtats = await MesureEtat.query()
    .where({ mesure_id: mesureId })
    .orderBy("date_changement_etat", "asc");

  let date_changement_etat;
  let natureLast;
  let champLast;
  for (const mesureEtat of mesureEtats) {
    if (
      natureLast !== mesureEtat.nature_mesure ||
      champLast !== mesureEtat.champ_mesure
    ) {
      natureLast = mesureEtat.nature_mesure;
      champLast = mesureEtat.champ_mesure;
      date_changement_etat = mesureEtat.date_changement_etat;
    }
  }

  const { nature_mesure, champ_mesure, lieu_vie, ville, code_postal, pays } =
    mesureEtats[mesureEtats.length - 1];

  const geodata = (await getGeoDatas(code_postal, ville)) || {};
  const departement = code_postal ? await getDepartement(code_postal) : {};

  await Mesure.query()
    .update({
      champ_mesure,
      code_postal,
      date_protection_en_cours: date_changement_etat,
      departement_code: departement.id,
      latitude: geodata.latitude,
      lieu_vie,
      longitude: geodata.longitude,
      nature_mesure,
      pays,
      ville,
    })
    .where({ id: mesureId });
};
