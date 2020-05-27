const enqueteKeysBuilder = require("./enqueteKeysBuilder.service");

const ENQ_REP_AGREMENTS_FORMATIONS = {
  NB_DEPARTEMENTS: enqueteKeysBuilder.buildKeys({
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5+": "Plus de 5"
  })
};

module.exports = {
  ENQ_REP_AGREMENTS_FORMATIONS
};
