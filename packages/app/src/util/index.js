export * from "./browser";
export * from "./users/UserUtils";

export const formatTribunauxOptions = (tribunaux) => {
  return tribunaux.map(({ ti }) => {
    return {
      label: ti.etablissement,
      value: ti.id,
    };
  });
};

export function parseFloatValue(value) {
  return value !== "" && !isNaN(parseFloat(value)) ? parseFloat(value) : null;
}

export function parseIntValue(value) {
  return value !== "" && !isNaN(parseInt(value, 10)) ? parseInt(value, 10) : null;
}
