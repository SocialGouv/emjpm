const logger = require("~/utils/logger");
const updateGestionnaireMesuresLastUpdate = require("~/services/updateGestionnaireMesuresLastUpdate.js");

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
      updatedRows = await updateGestionnaireMesuresLastUpdate(
        "services",
        row.service_id
      );
    } else if (row.mandataire_id) {
      updatedRows = await updateGestionnaireMesuresLastUpdate(
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
