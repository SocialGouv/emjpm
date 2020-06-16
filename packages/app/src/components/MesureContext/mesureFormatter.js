import { COUNTRIES } from "../../constants/mesures";

export const mesureFormatter = {
  formatMajeurProtege,
  formatPays,
};

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
