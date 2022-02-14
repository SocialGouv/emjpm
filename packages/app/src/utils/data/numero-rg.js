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

export function checkNumeroRgAlphanum(str) {
  return /^[a-z0-9]+$/i.test(str);
}

export function checkNumeroRgLengthLt(str) {
  return !(str && str.length < 8);
}

export function checkNumeroRgLengthGt(str) {
  return !(!str || str.length > 8);
}

export const MESSAGE_VALID_NUMERO_RG_ALPHANUM =
  "8 chiffres ou lettres. \n Aucun caractère spécial ou espace n'est accepté. \n Par exemple: 12A34567.";
export const MESSAGE_VALID_NUMERO_RG_LENGTH_LT =
  "8 chiffres ou lettres. \n Préfixez votre numéro RG de 0 si vous disposez de moins de 8 caractères. \n Par exemple: 01234567.";
export const MESSAGE_VALID_NUMERO_RG_LENGTH_GT =
  "8 chiffres ou lettres maximum. \n Par exemple: 12A34567.";

export const MESSAGE_DUPLICATE_NUMERO_RG_MANDATAIRE =
  "Le numéro RG que vous venez de saisir existe déjà sur votre compte eMJPM pour ce tribunal. Merci de le rectifier.";

export const MESSAGE_DUPLICATE_NUMERO_RG_TI =
  "Le numéro RG que vous venez de saisir existe déjà sur le compte eMJPM de ce mandataire pour ce tribunal. Merci de le rectifier.";
