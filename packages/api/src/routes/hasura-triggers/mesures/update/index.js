const logger = require("~/utils/logger");
const updateMesuresCounter = require("~/services/updateMesuresCounter");

module.exports = async (req, res) => {
  logger.info(`[TRIGGER_MESURES_UPDATE] start`);
  let status;
  try {
    const newRow = req.body.event?.data?.new;
    const oldRow = req.body.event?.data?.old;
    const row = newRow || oldRow;
    if (!row) {
      throw new Error("undefined row");
    }
    if (!row.service_id && !row.mandataire_id) {
      throw new Error("row missing gestionnaire");
    }

    const tiIDs = [];
    if ((newRow?.ti_id || null) !== (oldRow?.ti_id || null)) {
      if (newRow?.ti_id) {
        tiIDs.push(newRow.ti_id);
      }
      if (oldRow?.ti_id) {
        tiIDs.push(oldRow.ti_id);
      }
    }

    const { mandataire_id: mandataireId, service_id: serviceId } = row;

    await updateMesuresCounter({ mandataireId, serviceId, tiIDs });

    status = "success";
    logger.info(`[TRIGGER_MESURES_UPDATE] end`);
  } catch (e) {
    status = "error";
    logger.error(e);
  }

  // success
  return res.json({
    status,
  });
};
