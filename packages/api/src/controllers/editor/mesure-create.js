const { validationResult } = require("express-validator");

const { sanitizeMesureProperties } = require("../../utils/mesure");

const { saveMesure } = require("./service/saveMesure");
const updateMesureStates = require("./service/updateMesureStates");

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

  try {
    const mesureQueryResult = await saveMesure({
      datas: body,
      type,
      antenneId,
      serviceOrMandataire,
      ti,
    });

    await updateMesureStates(serviceOrMandataire, type);

    return res.status(201).json(sanitizeMesureProperties(mesureQueryResult));
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureCreate;
