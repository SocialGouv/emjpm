export const MESURE_CATEGORY_TYPE_KEYS = [
  "TOTAL",
  "TUTELLE",
  "CURATELLE_RENFORCEE",
  "CURATELLE_SIMPLE",
  "SAUVEGARDE_JUSTICE",
  "OTHER"
];

const MESURE_CATEGORY_TYPE_COLORS = {
  TOTAL: "red",
  CURATELLE_RENFORCEE: "#00977B",
  CURATELLE_SIMPLE: "#E46137",
  OTHER: "#CEA914",
  SAUVEGARDE_JUSTICE: "#362983",
  TUTELLE: "#9C0E68"
};

const VALUE_LABEL = {
  TOTAL: "Total",
  CURATELLE_RENFORCEE: "Curatelle renforcée",
  CURATELLE_SIMPLE: "Curatelle simple",
  OTHER: "Autre",
  SAUVEGARDE_JUSTICE: "Sauvegarde de justice",
  TUTELLE: "Tutelle"
};

export const getMesureCategoryTypeColor = type => MESURE_CATEGORY_TYPE_COLORS[type];

export const getMesureCategoryTypeLabel = type => VALUE_LABEL[type];
