const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");

const deleteById = async (req, res) => {
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

  await MesureEtat.query().where("mesure_id", id).delete();

  await Mesure.query()
    .where("id", id)
    .where(`${type}_id`, serviceOrMandataire.id)
    .delete();

  return res.status(204).json({});
};

const deleteAll = async (req, res) => {
  const {
    user: { user_id },
  } = req;

  let user;
  let serviceOrMandataire;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "user not found" });
  }

  try {
    const type = user.type === "service" ? "service" : "mandataire";
    try {
      serviceOrMandataire = await user.$relatedQuery(type);
    } catch (error) {
      return res.status(422).json({ error: `${type} not found` });
    }

    await MesureEtat.query()
      .delete()
      .whereIn(
        "mesure_id",
        Mesure.query()
          .select("mesures.id")
          .where({ [`${type}_id`]: serviceOrMandataire.id })
      );

    await Mesure.query().where(`${type}_id`, serviceOrMandataire.id).delete();
    res.status(200).end();
  } catch (err) {
    return res.status(401).end({ error: "something goes wrong" });
  }
};

module.exports = {
  deleteById,
  deleteAll,
};
