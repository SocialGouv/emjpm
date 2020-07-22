const { Departement } = require("../models/Departement");
const getRegionCode = require("../utils/getRegionCode");

module.exports = async (code_postal) => {
  const regionCode = getRegionCode(code_postal);
  const departement = await Departement.query()
    .where({ code: regionCode })
    .first();
  return departement;
};
