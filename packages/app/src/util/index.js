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

export function parseFormFloat(value) {
  return value !== "" && !isNaN(parseFloat(value)) ? parseFloat(value) : null;
}

export function parseFormInt(value) {
  return value !== "" && !isNaN(parseInt(value, 10)) ? parseInt(value, 10) : null;
}

export function parseFormInput(value) {
  return value !== "" ? value : null;
}

export function formatFormInput(value) {
  return value === null || value === undefined ? "" : value;
}

export function formatFormBoolean(value) {
  return value !== true && value !== false ? undefined : value;
}
