const sentry = require("../utils/sentry");
const siret = require("../utils/siret");
const logger = require("../utils/logger");

const fetchTribunalDatas = async (tribunal_siret) => {
  const { error, data } = await siret.find(tribunal_siret);

  if (error) {
    logger.error(error);
    sentry.captureException(new Error(error));
  }

  if (!data) {
    return null;
  }

  const { adresseEtablissement, periodesEtablissement } = data;
  const {
    numeroVoieEtablissement,
    typeVoieEtablissement,
    libelleVoieEtablissement,
    codePostalEtablissement,
    libelleCommuneEtablissement,
  } = adresseEtablissement;
  const periode = periodesEtablissement.find((p) => !p.dateFin);
  const { enseigne1Etablissement } = periode || {};

  return {
    address: `${numeroVoieEtablissement} ${typeVoieEtablissement} ${libelleVoieEtablissement}`,
    code_postal: codePostalEtablissement,
    etablissement: enseigne1Etablissement,
    ville: libelleCommuneEtablissement,
    siret: tribunal_siret,
  };
};

module.exports = { fetchTribunalDatas };
