const logger = require("~/utils/logger");
const updateGestionnaireLastUpdate = require("./updateGestionnaireLastUpdate");

module.exports = async (req, res) => {
  logger.info(`[TRIGGER_MESURES_UPDATE] start updating related gestionnaires`);
  let status;
  const updatedRows = 0;
  try {
    const row = req.body.event?.data?.new;
    if (!row) {
      throw new Error("undefined row");
    }

    let updatedRows;
    if (row.service_id) {
      updatedRows = await updateGestionnaireLastUpdate(
        "services",
        row.service_id
      );
    } else if (row.mandataire_id) {
      updatedRows = await updateGestionnaireLastUpdate(
        "mandataires",
        row.mandataire_id
      );
    } else {
      throw new Error("row missing gestionnaire");
    }

    status = "success";
    logger.info(`[TRIGGER_MESURES_UPDATE] updated rows: ${updatedRows}`);
  } catch (e) {
    status = "error";
    logger.error(e);
  }

  // success
  return res.json({
    status,
    updatedRows,
  });
};
