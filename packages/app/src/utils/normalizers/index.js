import initCap from "~/utils/std/initCap";

export function normalizeFirstName(value) {
  if (!value) {
    value = "";
  }
  return initCap(value).trimStart();
}

export function normalizeLastName(value) {
  if (!value) {
    value = "";
  }
  return value.toUpperCase().trimStart();
}
