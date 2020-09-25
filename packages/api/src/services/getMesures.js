const { Mandataire } = require("../models/Mandataire");
const { Mesure } = require("../models/Mesure");
const { ServiceMember } = require("../models/ServiceMember");

module.exports = async (userId, userType) => {
  if (userType === "service") {
    const mesures = await Mesure.query().whereIn(
      "service_id",
      ServiceMember.query().select("id").where({
        userId: userId,
      })
    );
    return mesures;
  } else {
    const mandataire = await Mandataire.query()
      .where({ user_id: userId })
      .first();
    const mesures = await Mesure.query().where({
      mandataire_id: mandataire.id,
    });
    return mesures;
  }
};
