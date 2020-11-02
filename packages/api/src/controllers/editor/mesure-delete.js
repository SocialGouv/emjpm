const { transaction } = require("objection");

const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { MesureRessources } = require("../../models/MesureRessources");

const updateMesureStates = require("./service/updateMesureStates");

const deleteById = async (req, res) => {
  const {
    params: { id },
  } = req;

  const serviceOrMandataire = req.serviceOrMandataire;
  const type = req.type;

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

  await updateMesureStates(serviceOrMandataire, type);

  return res.status(200).json({ affected_rows: affectedRows });
};

const deleteAll = async (req, res) => {
  const serviceOrMandataire = req.serviceOrMandataire;
  const type = req.type;

  try {
    const mesures = await Mesure.query()
      .select("mesures.id")
      .where({ [`${type}_id`]: serviceOrMandataire.id });

    const mesureIds = mesures.map((m) => m.id);

    const affectedRows = await transaction(
      Mesure,
      MesureEtat,
      MesureRessources,
      async (Mesure, MesureEtat, MesureRessources) => {
        await MesureEtat.query().delete().whereIn("mesure_id", mesureIds);
        await MesureRessources.query().delete().whereIn("mesure_id", mesureIds);

        const affectedRows = await Mesure.query()
          .where(`${type}_id`, serviceOrMandataire.id)
          .delete();

        return affectedRows;
      }
    );

    await updateMesureStates(serviceOrMandataire, type);

    return res.status(200).json({ affected_rows: affectedRows });
  } catch (err) {
    return res.status(401).end({ errors: [{ msg: "something goes wrong" }] });
  }
};

module.exports = {
  deleteAll,
  deleteById,
};
