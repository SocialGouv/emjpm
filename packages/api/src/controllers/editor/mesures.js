const { MESURE_PROTECTION_STATUS } = require("@emjpm/core");
const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");

const mesures = async (req, res) => {
  const {
    query: { status = MESURE_PROTECTION_STATUS.en_attente },
    user: { user_id },
  } = req;

  const user = await User.query().where("id", user_id).first();

  let mesures = null;

  if (user.type === "service") {
    const service = await user.$relatedQuery("service");

    mesures = await Mesure.query()
      .where("service_id", service.id)
      .where("status", "=", status);
  } else {
    const mandataire = await user.$relatedQuery("mandataire");

    mesures = await Mesure.query()
      .where("mandataire_id", mandataire.id)
      .where("status", "=", status);
  }

  return res.status(200).json({ mesures: mesures });
};

module.exports = mesures;
