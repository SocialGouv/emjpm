const { Service, Mandataire } = require("~/models");

const { ServiceAntenne } = require("~/models");

module.exports = async function resetGestionnaireMesuresCounters(
  { mandataireId, serviceId },
  trx
) {
  if (mandataireId) {
    await Mandataire.query(trx)
      .update({
        mesures_en_attente: null,
        mesures_en_cours: null,
      })
      .where({ id: mandataireId });
  }
  if (serviceId) {
    await ServiceAntenne.query(trx)
      .update({
        mesures_awaiting: null,
        mesures_in_progress: null,
      })
      .where({ service_id: serviceId });

    await Service.query(trx)
      .update({
        mesures_awaiting: null,
        mesures_in_progress: null,
      })
      .where({ id: serviceId });
  }
};
