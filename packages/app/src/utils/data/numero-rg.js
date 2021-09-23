export function normalizeNumeroRG(str) {
  return (str || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .substr(0, 8)
    .padStart(8, "0");
}

export function validateNumeroRG(str) {
  return normalizeNumeroRG(str) === str;
}

export const MESSAGE_VALID_NUMERO_RG =
  "Un numéro RG valide se compose de 8 caractères alphanumériques majuscules (normalement 2 chiffres, suivi d'une lettre, puis de 5 chiffres). Nous vous recommandons de préfixer votre numéro RG d'un 0 si vous disposez de moins de 8 caractères. Exemple: 12A12345.";
