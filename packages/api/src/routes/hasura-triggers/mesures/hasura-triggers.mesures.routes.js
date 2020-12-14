const express = require("express");
const knex = require("../../../db/knex");
const { Mesure } = require("../../../models/Mesure");

const router = express.Router();

const logger = require("../../../utils/logger");

router.post("/delete-expired-pending", async (req, res) => {
  logger.info(`[TRIGGER_MESURES] start cleaning expired pending mesures`);
  const deletedRows = await Mesure.query()
    .delete()
    .where("status", "en_attente")
    .andWhere("created_at", "<", knex.raw("now() - interval '2 month'"));

  logger.info(`[TRIGGER_MESURES] deleted rows: ${deletedRows}`);

  // success
  return res.json({
    deletedRows,
  });
});

module.exports = router;
