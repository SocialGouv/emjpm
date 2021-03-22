const logger = require("~/utils/logger");
const updateGestionnaireMesuresEvent = require("~/services/updateGestionnaireMesuresEvent.js");

module.exports = async (req, res) => {
  logger.info(`[TRIGGER_MESURES_UPDATE] start updating related gestionnaires`);
  let status;
  const updatedRows = 0;
  try {
    const row = req.body.event?.data?.new || req.body.event?.data?.old;
    if (!row) {
      throw new Error("undefined row");
    }

    let updatedRows;
    if (row.service_id) {
      updatedRows = await updateGestionnaireMesuresEvent(
        "services",
        row.service_id
      );
    } else if (row.mandataire_id) {
      updatedRows = await updateGestionnaireMesuresEvent(
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
