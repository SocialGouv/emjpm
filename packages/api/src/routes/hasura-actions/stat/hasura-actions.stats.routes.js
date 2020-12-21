const express = require("express");

const { Departement } = require("~/models");
const { Mesure } = require("~/models");
const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");
const knex = require("~/db/knex");

const router = express.Router();

router.post("/opened-mesures", async (req, res) => {
  const { regionId, departementId, start, end } = req.body.input;
  const departementIds = await getDepartementIds(regionId, departementId);

  const query = Mesure.query()
    .count("id")
    .where("date_nomination", ">", start)
    .where("date_nomination", "<=", end);
  if (departementIds) {
    query.where("department_id", "in", departementIds);
  }

  const [openedMesuresNb] = await query;

  return res.status(200).json({
    opened_mesures_nb: openedMesuresNb.count,
  });
});

router.post("/closed-mesures", async (req, res) => {
  const { regionId, departementId, start, end } = req.body.input;

  const departementIds = await getDepartementIds(regionId, departementId);

  const query = Mesure.query()
    .count("id")
    .where("date_fin_mesure", ">", start)
    .where("date_fin_mesure", "<=", end);
  if (departementIds) {
    query.where("department_id", "in", departementIds);
  }

  const [closedMesuresNb] = await query;

  return res.status(200).json({
    closed_mesures_nb: closedMesuresNb.count,
  });
});

router.post(
  "/available-mesures",
  async (req, res, next) => {
    const { regionId, departementId } = req.body.input;
    try {
      const filters = {};
      if (departementId) {
        filters.department_id = departementId;
      } else if (regionId) {
        filters.region_id = regionId;
      }
      const availibilities = await knex("view_department_availability").where(
        filters
      );

      const availableMesuresNb = availibilities.reduce((acc, availability) => {
        const max = availability.mesures_max || 0;
        const awaiting = availability.mesures_awaiting || 0;
        const inProgress = availability.mesures_in_progress || 0;
        return acc + (max - inProgress - awaiting);
      }, 0);

      return res.status(200).json({
        available_mesures_nb: availableMesuresNb,
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;

async function getDepartementIds(regionId, departementId) {
  let departementIds;
  if (departementId) {
    departementIds = [departementId];
  } else if (regionId) {
    const queryResult =
      (await Departement.query().where({ id_region: regionId }).select("id")) ||
      [];
    departementIds = queryResult.map((res) => res.id);
  }
  return departementIds;
}
