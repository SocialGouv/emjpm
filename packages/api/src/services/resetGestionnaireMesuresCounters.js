const { Service, Mandataire } = require("~/models");

const { ServiceAntenne } = require("~/models");

module.exports = async function resetGestionnaireMesuresCounters(
  { mandataireId, serviceId },
  trx
) {
  if (mandataireId) {
    await Mandataire.query(trx)
      .update({
        mesures_en_attente_cached: null,
        mesures_en_cours_cached: null,
      })
      .where({ id: mandataireId });
  }
  if (serviceId) {
    await ServiceAntenne.query(trx)
      .update({
        dispo_cached: null,
        mesures_awaiting_cached: null,
        mesures_in_progress_cached: null,
      })
      .where({ service_id: serviceId });

    await Service.query(trx)
      .update({
        mesures_awaiting_cached: null,
        mesures_in_progress_cached: null,
      })
      .where({ id: serviceId });
  }
};
