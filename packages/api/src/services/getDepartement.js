const { Departement } = require("~/models/Departement");
const { getDepartementCode } = require("~core");

module.exports = async (code_postal) => {
  const departementCode = getDepartementCode(code_postal);
  const departement = await Departement.query()
    .where({ code: departementCode })
    .first();
  return departement;
};
