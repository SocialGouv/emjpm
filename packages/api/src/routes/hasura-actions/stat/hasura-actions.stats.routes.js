const express = require("express");

const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");
const knex = require("../../../db/knex");

const router = express.Router();

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
