export function normalizeNumeroRG(str) {
  return (str || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .substr(0, 8)
    .padEnd(8, "0");
}

export function validateNumeroRG(str) {
  return normalizeNumeroRG(str) === str;
}

export const MESSAGE_VALID_NUMERO_RG =
  "Un Numéro RG valide se compose de 8 caractères alphanumériques (normalement 2 chiffres, suivi d'une lettre, puis de 5 chiffres).";
