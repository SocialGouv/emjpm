const { Tis } = require("~/models");

module.exports = async (siret) => {
  const tis = await Tis.query().where("siret", siret).first();
  return tis;
};
