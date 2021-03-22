const express = require("express");
const { Mesure, User } = require("~/models");

const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");
const { isMandataire } = require("@emjpm/biz");
const updateGestionnaireMesuresCounters = require("~/services/updateGestionnaireMesuresCounters");

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
  "/calculate-mesures",
  async (req, res, next) => {
    const { serviceId, mandataireId } = req.body.input;
    let result;
    if (serviceId) {
      result = await updateGestionnaireMesuresCounters("services", serviceId);
    }
    if (mandataireId) {
      result = await updateGestionnaireMesuresCounters(
        "mandataires",
        mandataireId
      );
    }
    console.log({ result });
    try {
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
