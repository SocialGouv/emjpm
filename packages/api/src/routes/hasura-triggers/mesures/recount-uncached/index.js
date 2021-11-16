const knex = require("~/db/knex");
const logger = require("~/utils/logger");

module.exports = async (_req, res) => {
  logger.info(`[TRIGGER_MESURES_RECOUNT_UNCACHED] start`);
  const mandatairesCountMesures = knex.raw(`
UPDATE
    mandataires
SET
    mesures_en_cours_cached = (SELECT COUNT(*) FROM mesures m WHERE m.mandataire_id = mandataires.id AND m.status = 'en_cours'),
    mesures_en_attente_cached = (SELECT COUNT(*) FROM mesures m WHERE m.mandataire_id = mandataires.id AND m.status = 'en_attente')
WHERE mandataires.mesures_en_cours_cached IS NULL OR mandataires.mesures_en_attente_cached IS NULL;
`);
  const servicesCountMesures = knex.raw(`
UPDATE
    services
SET
    mesures_in_progress_cached = (SELECT COUNT(*) FROM mesures m WHERE m.service_id = services.id AND m.status = 'en_cours'),
    mesures_awaiting_cached = (SELECT COUNT(*) FROM mesures m WHERE m.service_id = services.id AND m.status = 'en_attente')
WHERE services.mesures_in_progress_cached IS NULL OR services.mesures_awaiting_cached IS NULL;
`);
  const serviceAntenneCountMesures = knex.raw(`
UPDATE
    service_antenne
SET
    mesures_in_progress_cached = (SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_cours'),
    mesures_awaiting_cached = (SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_attente'),
    dispo_cached = service_antenne.mesures_max-((SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_attente')+(SELECT COUNT(*) FROM mesures m WHERE m.antenne_id = service_antenne.id AND m.status = 'en_cours'))
WHERE service_antenne.mesures_in_progress_cached IS NULL OR service_antenne.mesures_awaiting_cached IS NULL;
`);
  await Promise.all([
    mandatairesCountMesures,
    servicesCountMesures,
    serviceAntenneCountMesures,
  ]);

  logger.info(`[TRIGGER_MESURES_RECOUNT_UNCACHED] end`);

  // success
  return res.json({
    success: true,
  });
};
