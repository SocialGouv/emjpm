const { User } = require("../../model/User");
const { Mesures } = require("../../model/Mesures");

const mesures = async (req, res) => {
  const { status } = req.query;
  const { user_id } = req.user;
  const user = await User.query()
    .where("id", user_id)
    .first();
  let mesures = null;
  if (user.type === "service") {
    const service = await user.$relatedQuery("service");
    console.log(service.id);
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
