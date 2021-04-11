const codePostal = require("./code_postal.json");

const getDepartementByCodePostal = (cp) => {
  return codePostal[cp]?.departement;
};
const getCommunesByCodePostal = (cp) => {
  return codePostal[cp]?.communes;
};

module.exports = {
  getCommunesByCodePostal,
  getDepartementByCodePostal,
};
