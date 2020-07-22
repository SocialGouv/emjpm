const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");

const mesures = async (req, res) => {
  const {
    query: { status },
    user: { user_id },
  } = req;

  const user = await User.query().where("id", user_id).first();

  let mesures = null;

  if (user.type === "service") {
    const service = await user.$relatedQuery("service");
    const filter = { service_id: service.id };
    if (status) {
      filter.status = status;
    }
    mesures = await Mesure.query().withGraphFetched("[etats]").where(filter);
  } else {
    const mandataire = await user.$relatedQuery("mandataire");
    const filter = { mandataire_id: mandataire.id };
    if (status) {
      filter.status = status;
    }
    mesures = await Mesure.query().withGraphFetched("[etats]").where(filter);
  }

  return res.status(200).json({ mesures: mesures });
};

module.exports = mesures;
