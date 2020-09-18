const getDepartement = require("../services/getDepartement");
const getGeoDatas = require("../services/getGeoDatas");

const editorMesureLastEtatMiddleWare = async (req, res, next) => {
  const { body } = req;
  const etats = body.etats;
  etats.sort((a, b) => {
    return a.date_changement_etat.getTime() - b.date_changement_etat.getTime();
  });
  const lastEtat = body.etats ? body.etats[body.etats.length - 1] : null;

  const departement = await getDepartement(lastEtat.code_postal);
  req.departement = departement;

  const geoloc = await getGeoDatas(lastEtat.code_postal, lastEtat.ville);

  if (geoloc) {
    req.longitude = geoloc.longitude;
    req.latitude = geoloc.latitude;
  }

  req.lastEtat = lastEtat;

  next();
};

module.exports = editorMesureLastEtatMiddleWare;
