const knex = require("~/db/knex");
const { Mesure } = require("~/models");
const logger = require("~/utils/logger");

module.exports = async (req, res) => {
  logger.info(
    `[TRIGGER_MESURES_DELETE_EXPIRED_PENDING] start cleaning expired pending mesures`
  );
  const deletedRows = await Mesure.query()
    .delete()
    .where("status", "en_attente")
    .andWhere("created_at", "<", knex.raw("now() - interval '2 month'"));

  logger.info(
    `[TRIGGER_MESURES_DELETE_EXPIRED_PENDING] deleted rows: ${deletedRows}`
  );

  // success
  return res.json({
    deletedRows,
  });
};
