import * as yup from "yup";
import { parse, isDate } from "date-fns";

export const FORM_REQUIRED_MESSAGE = "Veuillez renseigner ce champ.";
export const EMAIL_NOT_VALID =
  "Veuillez saisir une adresse e-mail valide. Par exemple: john.doe@justice.fr";
export const FORM_YEAR_NOT_VALID =
  "Veuillez saisir une année valide. Par exemple: 1970";
export const FORM_DATE_NOT_VALID =
  "Veuillez saisir une année valide. Par exemple: 01/01/2021";
export const NOM_NOT_VALID = "Veuillez saisir un nom valide. Par exemple: DOE";
export const PRENOM_NOT_VALID =
  "Veuillez saisir un nom prénom. Par Exemple: John";
export const SERVICE_NOT_VALID =
  "Veuillez saisir un nom de service valide. Par exemple: Protection des Majeurs 75";
export const TELEPHONE_NOT_VALID =
  "Veuillez saisir un numéro de téléphone valide. Par exemple: 0175757575";
export const TELEPHONE_PORTABLE_NOT_VALID =
  "Veuillez saisir un numéro de téléphone portable valide. Par exemple: 0601020304";
export const NIVEAU_DE_RESSOURCE_NOT_VALID =
  "Veuillez saisir un niveau de ressources valide. Par exemple: 10543";
export const CODE_POSTAL_NOT_VALID =
  "Veuillez saisir un code postal valide. Par exemple: 75001";
export const SIRET_NOT_VALID =
  "Le SIRET doit être composé de 14 chiffres. Par exemple: 82254321300027.";
export const REDIRECT_URL_NOT_VALID =
  'Veuillez saisir une url valide. Par exemple: https://world-best-software-company.fr ou  ["https://world-best-software-company.fr","http://localhost/"].\n le "/" à la fin de l\'url est pris en compte.';
export const QRCODE_TOKEN_FORMAT =
  "Le code doit être composé de 6 chiffres. Par exemple: 123546.";
export const QRCODE_TOKEN_INVALID =
  "Le code n'est pas valide ou a expiré, si ce n'est pas encore fait, veuillez scanner le QRCode affiché en utilisant votre application 2FA pour obtenir un code valide, sinon il se peut que le code ait expiré, la durée de vie d'un code est de 30 secondes, consultez votre application 2FA pour obtenir un nouveau code.";

export function parseDateString(_, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());
  return parsedDate;
}

export function parseDateStringWhenNullable(_, originalValue) {
  if (originalValue == "" || originalValue == null) {
    return null;
  }
  return parseDateString(_, originalValue);
}

yup.setLocale({
  mixed: {
    required: FORM_REQUIRED_MESSAGE,
  },
  number: {
    integer: "Le nombre indiqué doit être un entier",
    max: "Le nombre indiqué doit être inférieur ou égal à ${max}",
    min: "Le nombre indiqué doit être supérieur ou égal à ${min}",
    positive: "Le nombre indiqué doit être positif",
  },
  string: {
    email: EMAIL_NOT_VALID,
    length: "Le champ doit comporter ${length} caractères.",
  },
});

export default yup;
