import { format } from "date-fns";

import { GLOBAL, MESURE_PROTECTION } from "../constants";
import { isMonsieur } from "../services";

export const mesureFormatter = {
  formatChampMesure(champMesure) {
    if (!champMesure) {
      return "";
    }
    return MESURE_PROTECTION.CHAMP_MESURE.byKey[champMesure];
  },
  formatJudgmentDate(judgmentDate) {
    if (!judgmentDate) {
      return "";
    }
    return format(new Date(judgmentDate), "dd/MM/yyyy");
  },
  formatLieuVie(lieuVie) {
    if (!lieuVie) {
      return "";
    }
    return MESURE_PROTECTION.LIEU_VIE_MAJEUR.byKey[lieuVie];
  },
  formatMajeurProtege(civilite, realAge) {
    if (!civilite) {
      return `${realAge} ans`;
    }
    return `${
      isMonsieur({ civilite }) ? "Homme de" : "Femme de"
    } ${realAge} ans`;
  },
  formatNatureMesure(natureMesure) {
    if (!natureMesure) {
      return "";
    }
    return MESURE_PROTECTION.NATURE_MESURE.byKey[natureMesure];
  },
  formatPays(codePays) {
    if (codePays) {
      return GLOBAL.COUNTRIES.byKey[codePays];
    }
    return "";
  },
  formatStatus(status) {
    if (!status) {
      return "";
    }
    return MESURE_PROTECTION.STATUS.byKey[status];
  },
  formatTypeEtablissement(typeEtablissement) {
    if (!typeEtablissement) {
      return "";
    }
    return MESURE_PROTECTION.TYPE_ETABLISSEMENT.byKey[typeEtablissement];
  },
};
