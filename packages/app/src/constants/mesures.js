import { MESURE_PROTECTION, MESURE_PROTECTION_STATUS } from "@emjpm/biz";

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
  { label: "Aucun Tri", value: "" },
  { label: "Âge (croissant)", value: "annee_naissance_desc" },
  { label: "Âge (décroissant)", value: "annee_naissance_asc" },
  { label: "Date de nomination (ascendant)", value: "date_nomination_asc" },
  { label: "Date de nomination (descendant)", value: "date_nomination_desc" },
];

export const DEFAULT_MESURE_NATURE = {
  label: "Toutes les natures",
  value: null,
};

export const IS_URGENT = [
  { label: "oui, c'est une demande urgente", value: true },
  { label: "non, ce n'est pas une demande urgente", value: false },
];

export const SYNC_OCMI_DISABLED_MESSAGE =
  "La synchronisation de vos mesures avec OCMI est activée, désactiver la synchronisation pour pouvoir modifier vos mesures.";
