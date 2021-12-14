const { validationResult } = require("express-validator");

const knex = require("~/db/knex");

const { sanitizeMesureProperties } = require("~/utils/mesure");
const { validateNumeroRG } = require("~/utils/numero-rg");

const { saveMesure } = require("./service/saveMesure");

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

  if (body.strictNumeroRG && !validateNumeroRG(body.numero_rg)) {
    res.status(422).json({
      errors: [
        {
          msg:
            "Numero RG must contain exactly 8 uppercase alphanumeric characters. Invalid numero rg: " +
            body.numero_rg,
        },
      ],
    });
  }

  try {
    let mesureQueryResult;
    await knex.transaction(async function (trx) {
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
    });

    return res.status(201).json(sanitizeMesureProperties(mesureQueryResult));
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureCreate;
