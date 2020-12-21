const { MESURE_PROTECTION_STATUS } = require("../keys");

function isMonsieur({ civilite }) {
  if (civilite === "monsieur") {
    return true;
  }
  return false;
}

function isEnAttente({ status }) {
  return status === MESURE_PROTECTION_STATUS.en_attente;
}

function isEnCours({ status }) {
  return status === MESURE_PROTECTION_STATUS.en_cours;
}

function isEteinte({ status }) {
  return status === MESURE_PROTECTION_STATUS.eteinte;
}

function isTypeEtablissementRequired(lieuVie) {
  return ["etablissement", "etablissement_conservation_domicile"].includes(
    lieuVie
  );
}

module.exports = {
  isEnAttente,
  isEnCours,
  isEteinte,
  isMonsieur,
  isTypeEtablissementRequired,
};
