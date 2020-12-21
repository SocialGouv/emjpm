const { Mandataire } = require("~/models");
const { Mesure } = require("~/models");

module.exports = async ({ userId, serviceId }) => {
  if (serviceId) {
    const mesures = await Mesure.query()
      .where({
        service_id: serviceId,
        status: "en_cours",
      })
      .withGraphFetched("[tis]");
    return mesures;
  } else {
    const mandataire = await Mandataire.query()
      .where({ user_id: userId })
      .first();
    const mesures = await Mesure.query()
      .where({
        mandataire_id: mandataire.id,
        status: "en_cours",
      })
      .withGraphFetched("[tis]");
    return mesures;
  }
};
