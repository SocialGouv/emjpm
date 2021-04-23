const { transaction } = require("objection");

const { Mesure } = require("~/models");
const { MesureEtat } = require("~/models");
const { MesureRessources } = require("~/models");

const updateGestionnaireMesuresEvent = require("~/services/updateGestionnaireMesuresEvent.js");

const updateTiMesuresEvent = require("~/services/updateTiMesuresEvent.js");
const updateMesureStates = require("./service/updateMesureStates");

const deleteById = async (req, res) => {
  const {
    params: { id },
  } = req;

  const serviceOrMandataire = req.serviceOrMandataire;
  const type = req.type;

  const mesure = await Mesure.query().where("id", id);

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

  await updateGestionnaireMesuresEvent(type, serviceOrMandataire.id);

  if (mesure.ti_id) {
    await updateTiMesuresEvent(mesure.ti_id);
  }

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

    const tiIds = mesures.reduce((s, { ti_id }) => {
      if (ti_id) {
        s.add(ti_id);
      }
      return s;
    }, new Set());

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

    await updateGestionnaireMesuresEvent(type, serviceOrMandataire.id);

    for (const [tiId] of tiIds.entries()) {
      await updateTiMesuresEvent(tiId);
    }

    return res.status(200).json({ affected_rows: affectedRows });
  } catch (err) {
    return res.status(401).end({ errors: [{ msg: "something goes wrong" }] });
  }
};

module.exports = {
  deleteAll,
  deleteById,
};
