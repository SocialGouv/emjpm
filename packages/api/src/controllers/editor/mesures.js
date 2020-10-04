const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { sanitizeMesureProperties } = require("../../utils/mesure");

const mesures = async (req, res) => {
  const {
    query: { status },
  } = req;
  const {
    locals: {
      oauth: { token },
    },
  } = res;

  const {
    user: { id: user_id },
  } = token;
  const user = await User.query().where("id", user_id).first();

  let mesures = null;

  if (user.type === "service") {
    const service = await user.$relatedQuery("service");
    const filter = { service_id: service.id };
    if (status) {
      filter.status = status;
    }
    mesures = await Mesure.query()
      .withGraphFetched("[etats,ressources]")
      .where(filter);
  } else {
    const mandataire = await user.$relatedQuery("mandataire");
    const filter = { mandataire_id: mandataire.id };
    if (status) {
      filter.status = status;
    }
    mesures = await Mesure.query()
      .withGraphFetched("[etats,ressources]")
      .where(filter);
  }

  return res.status(200).json({
    mesures: mesures.map((m) => sanitizeMesureProperties(m)),
  });
};

module.exports = mesures;
