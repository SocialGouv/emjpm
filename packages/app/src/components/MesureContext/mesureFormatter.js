import { isMonsieur, MESURE_PROTECTION } from "@emjpm/core";
import { format } from "date-fns";

import { COUNTRIES } from "../../constants/mesures";

export const mesureFormatter = {
  formatMajeurProtege,
  formatPays,
  formatLieuVie,
  formatNatureMesure,
  formatChampProtection,
  formatMesureList,
};

function formatLieuVie(lieuVie) {
  if (!lieuVie) {
    return "";
  }
  return MESURE_PROTECTION.LIEU_VIE_MAJEUR.byKey[lieuVie];
}

function formatNatureMesure(natureMesure) {
  if (!natureMesure) {
    return "-";
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

function formatMesureList(mesureList) {
  const mesures = mesureList.map((mesure) => {
    const {
      lieu_vie,
      code_postal,
      numero_dossier,
      antenne_id,
      nature_mesure,
      champ_protection,
      ville,
      status,
      id,
      ti,
      annee_naissance,
      civilite,
      date_nomination,
      is_urgent,
      judgment_date,
      numero_rg,
      cabinet,
    } = mesure;

    return {
      judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyy") : null,
      isUrgent: is_urgent,
      age: annee_naissance ? annee_naissance : null,
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      civilite: civilite ? civilite : null,
      codePostal: code_postal ? code_postal : null,
      dateNomination: date_nomination ? date_nomination : null,
      dateNominationFormated: date_nomination
        ? format(new Date(date_nomination), "dd/MM/yyy")
        : null,
      id: id,
      tribunal: ti.etablissement,
      numeroDossier: numero_dossier ? numero_dossier : "-",
      numeroRg: numero_rg ? numero_rg : null,
      lieuVie: formatLieuVie(lieu_vie),
      status: status ? status : null,
      natureMesure: formatNatureMesure(nature_mesure),
      champProtection: formatChampProtection(champ_protection),
      ville: ville ? ville : null,
    };
  });
  return mesures;
}
