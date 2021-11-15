const logger = require("~/utils/logger");
const knex = require("~/db/knex");
const updateTiMesuresEvent = require("~/services/updateTiMesuresEvent");

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

    const { mandataire_id: mandataireId, service_id: serviceId } = row;
    const isService = !!serviceId;

    const promises = [];

    if (isService) {
      promises.push(
        knex.raw(
          `
          UPDATE
              services
          SET
              mesures_in_progress_cached = (SELECT COUNT(*) FROM mesures m WHERE m.service_id = services.id AND m.status = 'en_cours'),
              mesures_awaiting_cached = (SELECT COUNT(*) FROM mesures m WHERE m.service_id = services.id AND m.status = 'en_attente'),
              mesures_last_update = NOW()
          WHERE
              services.id = ?
        `,
          [serviceId]
        )
      );
      promises.push(
        knex.raw(
          `
          UPDATE
              service_antenne
          SET
              mesures_in_progress_cached = (SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_cours'),
              mesures_awaiting_cached = (SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_attente'),
              dispo_cached = service_antenne.mesures_max-((SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_attente')+(SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_cours'))
          WHERE
              service_antenne.service_id = ?
          `,
          [serviceId]
        )
      );
    } else {
      promises.push(
        knex.raw(
          `
            UPDATE
                mandataires
            SET
                mesures_en_cours_cached = (SELECT COUNT(*) FROM mesures m WHERE m.mandataire_id = mandataires.id AND m.status = 'en_cours'),
                mesures_en_attente_cached = (SELECT COUNT(*) FROM mesures m WHERE m.mandataire_id = mandataires.id AND m.status = 'en_attente'),
                mesures_last_update = NOW()
            WHERE mandataires.id = ?
        `,
          [mandataireId]
        )
      );
    }

    //

    if ((newRow?.ti_id || null) !== (oldRow?.ti_id || null)) {
      if (newRow?.ti_id) {
        promises.push(updateTiMesuresEvent(newRow.ti_id));
      }
      if (oldRow?.ti_id) {
        promises.push(updateTiMesuresEvent(oldRow.ti_id));
      }
    }

    await Promise.all(promises);

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
