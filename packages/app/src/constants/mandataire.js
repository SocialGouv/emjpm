export const SECRETARIAT_OPTIONS = [
  { label: "Non, je n'exerce pas avec un secretariat spécialisé", value: false },
  { label: "Oui, j'exerce avec un secretariat spécialisé", value: true }
];

export const SECRETARIAT_ETP_OPTIONS = [
  { label: "jusqu'à 30% d'un ETP", value: "0_30_ETP" },
  { label: "supérieure à 30% jusqu'à 50%", value: "30_50_ETP" },
  { label: "supérieure à 50% jusqu'à 70%", value: "50_70_ETP" },
  { label: "supérieure à 70% jusqu'à 90%", value: "70_90_ETP" },
  { label: "à temps plein", value: "100_ETP" }
];

export const TYPES = {
  MANDATAIRE_IND: "prépose",
  MANDATAIRE_PRE: "individuel",
  SERVICE: "service"
};
