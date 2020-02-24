const { User } = require("../../model/User");
const { Mesures } = require("../../model/Mesures");

const mesureBatch = async (req, res) => {
  const {
    body,
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

  try {
    serviceOrMandataire = await user.$relatedQuery(user.type);
  } catch (error) {
    return res.status(422).json({ error: `${user.type} not found` });
  }

  try {
    mesure = await Mesures.query().insert(
      body.map(mesure => ({
        ...mesure,
        [`${user.type}_id`]: serviceOrMandataire.id
      }))
    );
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(201).json({ mesure });
};

module.exports = mesureBatch;
