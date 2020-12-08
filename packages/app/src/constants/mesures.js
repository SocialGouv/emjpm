import { MESURE_PROTECTION, MESURE_PROTECTION_STATUS } from "@emjpm/core";

export const MESURE_STATUS_LABEL_VALUE_EN_COURS = {
  label: MESURE_PROTECTION.STATUS.byKey[MESURE_PROTECTION_STATUS.en_cours],
  value: MESURE_PROTECTION_STATUS.en_cours,
};
export const MESURE_STATUS_LABEL_VALUE_ETEINTE = {
  label: MESURE_PROTECTION.STATUS.byKey[MESURE_PROTECTION_STATUS.eteinte],
  value: MESURE_PROTECTION_STATUS.eteinte,
};
export const MESURE_STATUS_LABEL_VALUE_ATTENTE = {
  label: MESURE_PROTECTION.STATUS.byKey[MESURE_PROTECTION_STATUS.en_attente],
  value: MESURE_PROTECTION_STATUS.en_attente,
};

export const MESURE_STATUS_LABEL_VALUE = [
  MESURE_STATUS_LABEL_VALUE_EN_COURS,
  MESURE_STATUS_LABEL_VALUE_ETEINTE,
];

export const MESURE_SORTBY_LABEL_VALUE = [
  // { label: "Année de naissance", value: "annee_naissance" },
  // { label: "Date de nomination", value: "date_nomination" },
  { label: "Âge", value: "annee_naissance" },
  { label: "Date de décision", value: "date_nomination" },
];

export const DEFAULT_MESURE_NATURE = {
  label: "Toutes les natures",
  value: null,
};

export const IS_URGENT = [
  { label: "oui, c'est une demande urgente", value: true },
  { label: "non, ce n'est pas une demande urgente", value: false },
];
