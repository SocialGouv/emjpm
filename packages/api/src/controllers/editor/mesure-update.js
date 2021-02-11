const { validationResult } = require("express-validator");

const { sanitizeMesureProperties } = require("~/utils/mesure");

const updateMesureStates = require("./service/updateMesureStates");

const updateMesure = require("./service/updateMesure");

const mesureUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const {
    body,
    params: { id },
  } = req;

  const antenneId = body.antenne_id;
  // const user = req.user;
  const serviceOrMandataire = req.serviceOrMandataire;
  const ti = req.ti;
  const type = req.type;

  const editorId = res.locals.oauth.token.client.id;

  try {
    const mesureQueryResult = await updateMesure({
      antenneId,
      datas: body,
      editorId,
      id,
      serviceOrMandataire,
      ti,
      type,
    });

    await updateMesureStates(serviceOrMandataire, type);

    return res.status(201).json(sanitizeMesureProperties(mesureQueryResult));
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureUpdate;
