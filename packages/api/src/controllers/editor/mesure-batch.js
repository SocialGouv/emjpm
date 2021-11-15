const { validationResult } = require("express-validator");
const uniq = require("lodash.uniq");

const knex = require("~/db/knex");

const antenneIdIsValid = require("~/services/antenneIdIsValid");
const { sanitizeMesureProperties } = require("~/utils/mesure");
const { validateNumeroRG } = require("~/utils/numero-rg");

const { saveMesures } = require("./service/saveMesure");
const fetchTribunaux = require("./service/fetchTribunaux");

function checkMesuresNumeroRG(mesures) {
  const invalidRGList = [];
  let ok = true;
  for (const { numero_rg } of mesures) {
    if (!validateNumeroRG(numero_rg)) {
      ok = false;
      invalidRGList.push(numero_rg);
    }
  }
  return [ok, invalidRGList];
}

const mesureBatch = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const {
    body: { mesures, strictNumeroRG = false },
    type,
    serviceOrMandataire,
  } = req;

  if (!mesures || mesures.length === 0) {
    return res.status(201).json({ mesures: [] });
  }

  if (mesures.length > 1000) {
    return res
      .status(422)
      .json({ errors: [{ msg: "The number of mesures must be <= 1000" }] });
  }

  // check numero_rg validity
  if (strictNumeroRG) {
    const [ok, invalidRGList] = checkMesuresNumeroRG(mesures);
    if (!ok) {
      res.status(422).json({
        errors: [
          {
            msg:
              "Numero RG must contain exactly 8 uppercase alphanumeric characters. There are invalid numero rg: " +
              invalidRGList.join(","),
          },
        ],
      });
    }
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

  const editorId = res.locals.oauth.token.client.id;

  // process array of mesures
  try {
    const allMesureDatas = [];
    for (const mesure of mesures) {
      const { antenne_id } = mesure;
      const ti = tribunaux[mesure.tribunal_siret];

      allMesureDatas.push({
        antenneId: antenne_id ? antenne_id : null,
        datas: mesure,
        editorId,
        serviceOrMandataire,
        ti,
        type,
      });
    }

    let mesuresQueryResult;
    await knex.transaction(async function (trx) {
      try {
        mesuresQueryResult = await saveMesures(allMesureDatas, trx);
        await trx.commit();
      } catch (e) {
        await trx.rollback(e);
      }
    });

    return res.status(201).json({
      mesures: mesuresQueryResult.map((mqr) => sanitizeMesureProperties(mqr)),
    });
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureBatch;

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
