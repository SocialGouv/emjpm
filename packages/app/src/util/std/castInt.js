import isInt from "~/util/isInt";

export default function castInt(str, fallback = 0) {
  return isInt(str) ? parseInt(str) : fallback;
}
