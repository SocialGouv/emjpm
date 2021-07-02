const logger = require("~/utils/logger");
const updateGestionnaireMesuresEvent = require("~/services/updateGestionnaireMesuresEvent.js");
const updateTiMesuresEvent = require("~/services/updateTiMesuresEvent.js");

// deprecated and not used anymore for now

module.exports = async (req, res) => {
  logger.info(`[TRIGGER_MESURES_UPDATE] start updating related gestionnaires`);
  let status;
  let updatedRows = 0;
  try {
    const newRow = req.body.event?.data?.new;
    const oldRow = req.body.event?.data?.old;
    const row = newRow || oldRow;
    if (!row) {
      throw new Error("undefined row");
    }

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

    if ((newRow?.ti_id || null) !== (oldRow?.ti_id || null)) {
      if (newRow?.ti_id) {
        const tiUpdatedRows = await updateTiMesuresEvent(newRow.ti_id);
        updatedRows += tiUpdatedRows;
      }
      if (oldRow?.ti_id) {
        const tiUpdatedRows = await updateTiMesuresEvent(oldRow.ti_id);
        updatedRows += tiUpdatedRows;
      }
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
