const { validationResult } = require("express-validator");

const knex = require("~/db/knex");

const { sanitizeMesureProperties } = require("~/utils/mesure");

const { saveMesure } = require("./service/saveMesure");
const updateMesureStates = require("./service/updateMesureStates");

const updateGestionnaireMesuresEvent = require("~/services/updateGestionnaireMesuresEvent.js");
const updateTiMesuresEvent = require("~/services/updateTiMesuresEvent.js");

const mesureCreate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const antenneId = req.antenne_id;
  const serviceOrMandataire = req.serviceOrMandataire;
  const ti = req.ti;

  const type = req.type;

  const { body } = req;

  const editorId = res.locals.oauth.token.client.id;

  try {
    let mesureQueryResult;
    await knex.transaction(async function (trx) {
      try {
        mesureQueryResult = await saveMesure(
          {
            antenneId,
            datas: body,
            editorId,
            serviceOrMandataire,
            ti,
            type,
          },
          trx
        );
        await updateMesureStates(serviceOrMandataire, type, trx);
        await updateGestionnaireMesuresEvent(type, serviceOrMandataire.id, trx);
        await updateTiMesuresEvent(ti.id, trx);

        await trx.commit();
      } catch (e) {
        await trx.rollback(e);
      }
    });

    return res.status(201).json(sanitizeMesureProperties(mesureQueryResult));
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureCreate;
