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

export function parseFormFloat(value, defaultValue = null) {
  return value !== "" && !isNaN(parseFloat(value)) ? parseFloat(value) : defaultValue;
}

export function parseFormInt(value, defaultValue = null) {
  return value !== "" && !isNaN(parseInt(value, 10)) ? parseInt(value, 10) : defaultValue;
}

export function parseFormInput(value, defaultValue = null) {
  return value !== "" ? value : defaultValue;
}

export function formatFormInput(value) {
  return value === null || value === undefined ? "" : value;
}

export function formatFormBoolean(value) {
  return value !== true && value !== false ? undefined : value;
}
