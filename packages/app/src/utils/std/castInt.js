import isInt from "./isInt";

export default function castInt(str, fallback = 0) {
  return isInt(str) ? parseInt(str) : fallback;
}
