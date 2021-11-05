const knex = require("~/db/knex");
const logger = require("~/utils/logger");

module.exports = async (_req, res) => {
  logger.info(
    `[TRIGGER_MESURES_UPDATE_STATUS] start comparing date_fin_mesure at today`
  );
  const { rowCount: affectedRows } = await knex.raw(`
      UPDATE
        mesures
      SET
        status = 'eteinte'
      WHERE
        status = 'en_cours' AND
        date_fin_mesure IS NOT NULL AND
        NOW() >= date_fin_mesure
  `);

  logger.info(`[TRIGGER_MESURES_UPDATE_STATUS] affected rows: ${affectedRows}`);

  // success
  return res.json({
    affectedRows,
  });
};
