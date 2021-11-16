const knex = require("~/db/knex");
const updateTiMesuresEvent = require("~/services/updateTiMesuresEvent");

module.exports = async function updateMesuresCounter(
  { mandataireId, serviceId, tiIDs = [] },
  trx
) {
  const isService = !!serviceId;

  const promises = [];

  const q = trx || knex;

  if (isService) {
    promises.push(
      q.raw(
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
      q.raw(
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
      q.raw(
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

  for (const tiID of tiIDs) {
    promises.push(updateTiMesuresEvent(tiID, trx));
  }

  await Promise.all(promises);
};
