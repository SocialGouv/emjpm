const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");

const mesureBatch = async (req, res) => {
  const {
    body,
    user: { user_id },
  } = req;
  let user;
  let serviceOrMandataire;
  let mesures;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "User not found" });
  }

  const type = user.type === "service" ? "service" : "mandataire";

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
  } catch (error) {
    return res.status(422).json({ error: `${type} not found` });
  }

  const payload = body.mesures.map((mesure) => ({
    ...mesure,
    [`${type}_id`]: serviceOrMandataire.id,
  }));

  try {
    mesures = await Mesure.query().insert(payload);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(201).json({ mesures });
};

module.exports = mesureBatch;
