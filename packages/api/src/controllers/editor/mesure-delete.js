const { transaction } = require("objection");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { MesureRessources } = require("../../models/MesureRessources");

const deleteById = async (req, res) => {
  const {
    params: { id },
  } = req;

  const {
    locals: {
      oauth: { token },
    },
  } = res;
  const {
    user: { id: user_id },
  } = token;

  let user;
  let serviceOrMandataire;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: "user not found" }] });
  }

  const type = user.type === "service" ? "service" : "mandataire";

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: `${type} not found` }] });
  }

  const affectedRows = await transaction(
    Mesure,
    MesureEtat,
    MesureRessources,
    async (Mesure, MesureEtat, MesureRessources) => {
      await MesureEtat.query().where("mesure_id", id).delete();
      await MesureRessources.query().where("mesure_id", id).delete();
      const affectedRows = await Mesure.query()
        .where("id", id)
        .where(`${type}_id`, serviceOrMandataire.id)
        .delete();
      return affectedRows;
    }
  );
  return res.status(200).json({ affected_rows: affectedRows });
};

const deleteAll = async (req, res) => {
  const {
    locals: {
      oauth: { token },
    },
  } = res;
  const {
    user: { id: user_id },
  } = token;

  let user;
  let serviceOrMandataire;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: "user not found" }] });
  }

  try {
    const type = user.type === "service" ? "service" : "mandataire";
    try {
      serviceOrMandataire = await user.$relatedQuery(type);
    } catch (error) {
      return res.status(422).json({ errors: [{ msg: `${type} not found` }] });
    }

    const mesures = await Mesure.query()
      .select("mesures.id")
      .where({ [`${type}_id`]: serviceOrMandataire.id });

    const mesureIds = mesures.map((m) => m.id);

    const affectedRows = await transaction(
      Mesure,
      MesureEtat,
      MesureRessources,
      async (Mesure, MesureEtat, MesureRessources) => {
        console.log("Suppression MesureEtat");

        await MesureEtat.query().delete().whereIn("mesure_id", mesureIds);
        await MesureRessources.query().delete().whereIn("mesure_id", mesureIds);

        const affectedRows = await Mesure.query()
          .where(`${type}_id`, serviceOrMandataire.id)
          .delete();

        return affectedRows;
      }
    );
    return res.status(200).json({ affected_rows: affectedRows });
  } catch (err) {
    return res.status(401).end({ errors: [{ msg: "something goes wrong" }] });
  }
};

module.exports = {
  deleteById,
  deleteAll,
};
