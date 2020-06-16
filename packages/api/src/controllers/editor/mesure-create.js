const { validationResult } = require("express-validator");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");

const mesureCreate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors });
  }

  const {
    body,
    user: { user_id },
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
    mesure = await Mesure.query().insert({
      ...body,
      [`${type}_id`]: serviceOrMandataire.id,
    });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(201).json({ mesure });
};

module.exports = mesureCreate;
