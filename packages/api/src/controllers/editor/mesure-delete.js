const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");

const mesureDelete = async (req, res) => {
  const {
    params: { id },
    user: { user_id },
  } = req;

  let user;
  let serviceOrMandataire;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "user not found" });
  }

  const type = user.type === "service" ? "service" : "mandataire";

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
  } catch (error) {
    return res.status(422).json({ error: `${type} not found` });
  }

  await Mesure.query()
    .where("id", id)
    .where(`${type}_id`, serviceOrMandataire.id)
    .delete();

  return res.status(204).json({});
};

module.exports = mesureDelete;
