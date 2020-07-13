import { isMonsieur, MESURE_PROTECTION } from "@emjpm/core";

import { COUNTRIES } from "../../constants/mesures";

export const mesureFormatter = {
  formatMajeurProtege,
  formatPays,
  formatLieuVie,
  formatNatureMesure,
  formatChampProtection,
};

function formatLieuVie(lieuVie) {
  if (!lieuVie) {
    return "";
  }
  return MESURE_PROTECTION.LIEU_VIE_MAJEUR.byKey[lieuVie];
}

function formatNatureMesure(natureMesure) {
  if (!natureMesure) {
    return "";
  }
  return MESURE_PROTECTION.NATURE_MESURE.byKey[natureMesure];
}

function formatChampProtection(champProtection) {
  if (!champProtection) {
    return "";
  }
  return MESURE_PROTECTION.CHAMP_PROTECTION.byKey[champProtection];
}

function formatMajeurProtege(civilite, realAge) {
  if (!civilite) {
    return `${realAge} ans`;
  }
  return `${isMonsieur({ civilite }) ? "Homme de" : "Femme de"} ${realAge} ans`;
}

function formatPays(codePays) {
  if (COUNTRIES[codePays]) {
    return COUNTRIES[codePays];
  }
  return ``;
}
