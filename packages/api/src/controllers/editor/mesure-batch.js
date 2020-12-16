const { validationResult } = require("express-validator");
const uniq = require("lodash.uniq");

const getTi = require("~/services/getTi");
const antenneIdIsValid = require("~/services/antenneIdIsValid");
const { sanitizeMesureProperties } = require("~/utils/mesure");

const { saveMesures } = require("./service/saveMesure");
const updateMesureStates = require("./service/updateMesureStates");

const mesureBatch = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const {
    body: { mesures },
    type,
    serviceOrMandataire,
  } = req;

  if (!mesures || mesures.length === 0) {
    return res.status(201).json({ mesures: [] });
  }

  if (mesures.length > 100) {
    return res
      .status(422)
      .json({ errors: [{ msg: "The number of mesures must be <= 100" }] });
  }

  // check antenne_id validity
  const { errors: antenneErrors } = await checkAntenneIdValidity(mesures);
  if (antenneErrors.length > 0) {
    return res.status(422).json({ antenneErrors });
  }

  // check tribunal_siret validity and load tis
  const { errors: tiErrors, tribunaux } = await fetchTribunaux(mesures);
  if (tiErrors.length > 0) {
    return res.status(422).json({ tiErrors });
  }

  // process array of mesures
  try {
    const allMesureDatas = [];
    for (const mesure of mesures) {
      const { antenne_id } = mesure;
      const ti = findTribunal(tribunaux, mesure.tribunal_siret);

      allMesureDatas.push({
        antenneId: antenne_id ? antenne_id : null,
        datas: mesure,
        serviceOrMandataire,
        ti,
        type,
      });
    }

    const mesuresQueryResult = await saveMesures(allMesureDatas);

    await updateMesureStates(serviceOrMandataire, type);

    return res.status(201).json({
      mesures: mesuresQueryResult.map((mqr) => sanitizeMesureProperties(mqr)),
    });
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureBatch;

async function fetchTribunaux(mesures) {
  const errors = [];
  const tribunaux = [];
  const tribunalSirets = uniq(mesures.map((m) => m.tribunal_siret));
  for (const tribunalSiret of tribunalSirets) {
    const ti = await getTi(tribunalSiret);
    if (!ti) {
      errors.push({
        msg: `siret is not valid`,
        param: "tribunal_siret",
        value: tribunalSiret,
      });
    } else {
      tribunaux.push(ti);
    }
  }
  return { errors, tribunaux };
}

function findTribunal(tribunaux, tribunalSiret) {
  return tribunaux.find((t) => t.siret === tribunalSiret);
}

async function checkAntenneIdValidity(mesures, userId) {
  const errors = [];
  const antenneIds = uniq(mesures.map((m) => m.antenne_id));
  for (const antenneId of antenneIds) {
    if (antenneId && !(await antenneIdIsValid(antenneId, userId))) {
      errors.push({
        msg: `antenne_id is not valid`,
        param: "antenne_id",
        value: antenneId,
      });
    }
  }
  return { errors };
}
