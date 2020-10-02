const enqueteKeysBuilder = require("./enqueteKeysBuilder.service");

// constantes synchronisées avec le fichier app/ENQ_REP_AGREMENTS_FORMATIONS.const.js
const ENQ_REP_AGREMENTS_FORMATIONS = {
  NB_DEPARTEMENTS: enqueteKeysBuilder.buildKeys({
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    "5+": "Plus de 5",
  }),
};

module.exports = {
  ENQ_REP_AGREMENTS_FORMATIONS,
};
