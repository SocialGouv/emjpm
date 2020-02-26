const { User } = require("../../models/User");
const { Mesures } = require("../../models/Mesures");

const DEFAULT_STATUS = "Mesure en attente";

const mesures = async (req, res) => {
  const {
    query: { status = DEFAULT_STATUS },
    user: { user_id }
  } = req;

  const user = await User.query()
    .where("id", user_id)
    .first();

  let mesures = null;

  if (user.type === "service") {
    const service = await user.$relatedQuery("service");

    mesures = await Mesures.query()
      .where("service_id", service.id)
      .where("status", "=", status);
  } else {
    const mandataire = await user.$relatedQuery("mandataire");

    mesures = await Mesures.query()
      .where("mandataire_id", mandataire.id)
      .where("status", "=", status);
  }

  return res.status(200).json({ mesures: mesures });
};

module.exports = mesures;
