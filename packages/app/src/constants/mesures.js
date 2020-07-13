// export const MESURE_TYPES = [
//   "curatelle",
//   "curatelle renforcée",
//   "curatelle renforcée à la personne",
//   "curatelle renforcée aux biens",
//   "curatelle renforcée aux biens et à la personne",
//   "curatelle simple",
//   "curatelle simple à la personne",
//   "curatelle simple aux biens",
//   "curatelle simple à la personne",
//   "curatelle simple aux biens et à la personne",
//   "maj",
//   "mandat de protection future",
//   "mesure ad hoc",
//   "sauvegarde de justice",
//   "sauvegarde de justice avec mandat spécial",
//   "subrogé curateur",
//   "subrogé tuteur",
//   "tutelle",
//   "tutelle à la personne",
//   "tutelle aux biens",
//   "tutelle aux biens et à la personne",
// ];

export const MESURE_CIVILITIES = ["F", "H"];

export const MESURE_STATUS_LABEL_VALUE_EN_COURS = {
  label: "Mesure en cours",
  value: "Mesure en cours",
};
export const MESURE_STATUS_LABEL_VALUE_ETEINTE = {
  label: "Mesure éteinte",
  value: "Eteindre mesure",
};
export const MESURE_STATUS_LABEL_VALUE_ATTENTE = {
  label: "Mesure en attente",
  value: "Mesure en attente",
};

export const MESURE_STATUS_LABEL_VALUE = [
  MESURE_STATUS_LABEL_VALUE_EN_COURS,
  MESURE_STATUS_LABEL_VALUE_ETEINTE,
];

export const DEFAULT_MESURE_NATURE = {
  label: "Toutes les natures",
  value: null,
};

export const COUNTRIES = {
  BE: "Belgique",
  FR: "France",
};

export const IS_URGENT = [
  { label: "oui, c'est une demande urgente", value: true },
  { label: "non, ce n'est pas une demande urgente", value: false },
];
