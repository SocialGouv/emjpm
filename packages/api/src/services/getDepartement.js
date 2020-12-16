const { Departement } = require("~/models/Departement");
const { getDepartementCode } = require("@emjpm/core");

module.exports = async (code_postal) => {
  const regionCode = getDepartementCode(code_postal);
  const departement = await Departement.query()
    .where({ code: regionCode })
    .first();
  return departement;
};
