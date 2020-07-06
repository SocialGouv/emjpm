export const isMan = (civilite) => {
  return civilite === "monsieur" ? true : false;
};

export const getCiviliteLabel = (civilite) => {
  return isMan(civilite) ? "Monsieur" : "Madame";
};

export const CIVILITE_MONSIEUR = "monsieur";
export const CIVILITE_MADAME = "madame";
