const { User } = require("../../model/User");
const { Mesures } = require("../../model/Mesures");

const mesureDelete = async (req, res) => {
  const {
    params: { id },
    user: { user_id }
  } = req;

  let user;
  let serviceOrMandataire;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "user not found" });
  }

  try {
    serviceOrMandataire = await user.$relatedQuery(user.type);
  } catch (error) {
    return res.status(422).json({ error: `${user.type} not found` });
  }

  await Mesures.query()
    .where("id", id)
    .where(`${user.type}_id`, serviceOrMandataire.id)
    .delete();

  return res.status(204).json({});
};

module.exports = mesureDelete;
