const { Departement } = require("~/models");
const { getDepartementCode } = require("@emjpm/biz");

module.exports = async (code_postal) => {
  const departementCode = getDepartementCode(code_postal);
  const departement = await Departement.query()
    .where({ id: departementCode })
    .first();
  return departement;
};
