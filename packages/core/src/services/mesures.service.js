import { MESURE_PROTECTION_STATUS } from "../keys/MESURE_PROTECTION.key";

export function isMonsieur({ civilite }) {
  if (civilite === "monsieur") {
    return true;
  }
  return false;
}

export function isEnAttente({ status }) {
  return status === MESURE_PROTECTION_STATUS.en_attente;
}

export function isEnCours({ status }) {
  return status === MESURE_PROTECTION_STATUS.en_cours;
}

export function isEteinte({ status }) {
  return status === MESURE_PROTECTION_STATUS.eteinte;
}
