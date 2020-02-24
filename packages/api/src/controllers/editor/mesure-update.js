const { validationResult } = require("express-validator");

const { User } = require("../../model/User");
const { Mesures } = require("../../model/Mesures");

const mesureUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors });
  }

  const {
    body,
    params: { id },
    user: { user_id }
  } = req;
  let user;
  let serviceOrMandataire;
  let mesure;

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

  try {
    mesure = await Mesures.query()
      .where({ [`${type}_id`]: serviceOrMandataire.id })
      .findById(id);
  } catch (error) {
    return res.status(422).json({ error: "Mesure not found" });
  }

  try {
    mesure = await Mesures.query().patch(body);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(200).json({ mesure });
};

module.exports = mesureUpdate;
