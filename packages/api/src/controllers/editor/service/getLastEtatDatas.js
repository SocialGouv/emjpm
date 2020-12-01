const getDepartement = require("~/services/getDepartement");
const getGeoDatas = require("~/services/getGeoDatas");
const { isFrance } = require("@emjpm/biz");

async function getLastEtatDatas(etats, config = {}) {
  etats.sort((a, b) => {
    return a.date_changement_etat.getTime() - b.date_changement_etat.getTime();
  });
  const lastEtat = etats ? etats[etats.length - 1] : null;

  if (!isFrance(lastEtat.pays)) {
    return {
      lastEtat,
    };
  }
  const departement = await getDepartement(lastEtat.code_postal);

  const departement = await getDepartement(codePostal);

  const geoloc = await getGeoDatas(codePostal, ville);

  let longitude;
  let latitude;

  if (geoloc) {
    longitude = geoloc.longitude;
    latitude = geoloc.latitude;
  }

  return {
    departement,
    lastEtat,
    latitude,
    longitude,
  };
}

module.exports = getLastEtatDatas;
