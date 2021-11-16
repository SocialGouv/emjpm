const express = require("express");

const knex = require("~/db/knex");

const { Mesure, User } = require("~/models");

const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");
const { isMandataire } = require("@emjpm/biz");
const resetGestionnaireMesuresCounters = require("~/services/resetGestionnaireMesuresCounters");
const updateMesuresCounter = require("~/services/updateMesuresCounter");

const router = express.Router();

router.post("/stats", async (req, res) => {
  const { userId } = req.body.input;

  const user = await User.query().findById(userId);
  const type = isMandataire(user) ? "mandataire" : "service";
  const serviceOrMandataire = await user.$relatedQuery(type);

  const natureStats = await Mesure.query()
    .where({ [`${type}_id`]: serviceOrMandataire.id })
    .andWhere({ status: "en_cours" })
    .groupBy("nature_mesure")
    .select("nature_mesure")
    .count();

  const statistics = {
    natureStatistics: natureStats.map((stat) => ({
      name: stat.nature_mesure,
      value: stat.count,
    })),
  };

  return res.json(statistics);
});

router.post(
  "/reset-mesures-calculations",
  async (req, res, next) => {
    const { serviceId, mandataireId } = req.body.input;
    try {
      await resetGestionnaireMesuresCounters({ mandataireId, serviceId });
      return res.status(200).json({ state: true });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  hasuraActionErrorHandler("Erreur durant le comptage des mesures")
);

router.post(
  "/delete-all-mesures",
  async (req, res) => {
    const { serviceId, mandataireId } = req.user;

    const isService = !!serviceId;

    await knex.transaction(async function (trx) {
      try {
        if (isService) {
          await knex.raw(
            `DELETE FROM mesures WHERE service_id = ? AND status != 'en_attente'`,
            [serviceId]
          );
        } else {
          await knex.raw(
            `DELETE FROM mesures WHERE mandataire_id = ? AND status != 'en_attente'`,
            [mandataireId]
          );
        }
        await updateMesuresCounter({ mandataireId, serviceId }, trx);
        await trx.commit();
      } catch (e) {
        await trx.rollback(e);
      }
    });

    return res.json({ success: true });
  },
  hasuraActionErrorHandler("Erreur lors de la suppression des mesures")
);

module.exports = router;
