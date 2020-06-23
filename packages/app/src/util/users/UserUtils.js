export const isMandataire = (type) => {
  return type === "individuel" || type === "prepose";
};

export const isIndividuel = (type) => {
  return type === "individuel";
};

export const isPrepose = (type) => {
  return type === "prepose";
};

export const isService = (type) => {
  return type === "service";
};
