const { raw } = require("objection");

const { Tis } = require("~/models");

module.exports = async function updateTiMesuresEvent(id, trx) {
  const affectedRows = await Tis.query(trx)
    .patch({
      nb_mesures: raw(
        `(SELECT count(*) FROM mesures WHERE mesures.ti_id = tis.id)`
      ),
    })
    .where({
      id,
    });
  return affectedRows;
};
