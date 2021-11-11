const { Tis } = require("~/models");

module.exports = async (siret) => {
  let tis = await Tis.query().where("siret", siret).first();
  if (tis && !tis.immutable && tis.actual_tribunal_id) {
    tis = await Tis.query().where("id", tis.actual_tribunal_id).first();
  }
  return tis;
};
