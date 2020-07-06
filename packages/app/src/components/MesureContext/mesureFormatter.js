import { COUNTRIES } from "../../constants/mesures";
import { isMan } from "../../util/mesures";

export const mesureFormatter = {
  formatMajeurProtege,
  formatPays,
};

function formatMajeurProtege(civilite, realAge) {
  if (!civilite) {
    return `${realAge} ans`;
  }
  return `${isMan(civilite) ? "Homme de" : "Femme de"} ${realAge} ans`;
}

function formatPays(codePays) {
  if (COUNTRIES[codePays]) {
    return COUNTRIES[codePays];
  }
  return `pays non renseigné`;
}
