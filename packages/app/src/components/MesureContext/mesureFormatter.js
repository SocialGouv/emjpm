import { COUNTRIES } from "../../constants/mesures";
import { MESURE_PROTECTION } from "@emjpm/core";

export const mesureFormatter = {
  formatMajeurProtege,
  formatPays,
  formatLieuVie
};

function formatLieuVie(lieuVie) {
  if (!lieuVie) {
    return "";
  }
  return MESURE_PROTECTION.LIEU_VIE_MAJEUR.byKey[lieuVie];
}

function formatMajeurProtege(civilite, realAge) {
  if (!civilite) {
    return `${realAge} ans`;
  }
  return `${civilite === "F" ? "Femme de" : "Homme de"} ${realAge} ans`;
}

function formatPays(codePays) {
  if (COUNTRIES[codePays]) {
    return COUNTRIES[codePays];
  }
  return `pays non renseigné`;
}
