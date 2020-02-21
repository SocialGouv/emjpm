const { User } = require("../model/User");
const { Mesures } = require("../model/Mesures");

const DEFAULT_STATUS = "Mesure en attente";

const index = async (req, res) => {
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

const create = async (req, res) => {
  const {
    body,
    user: { user_id }
  } = req;
  let user;
  let mesure;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "User not found" });
  }

  const serviceOrMandataire = await user.$relatedQuery("user.type");

  try {
    mesure = await Mesures.query().insert({
      ...body,
      [`${serviceOrMandataire}_id`]: serviceOrMandataire.id
    });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(200).json({ mesure });
};

module.exports = {
  index,
  create
};
