import * as yup from "yup";

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
export const URL_NOT_VALID =
  "Veuillez saisir une url valide. Par exemple: https://emjpm.fabrique.social.gouv.fr/world_best_software_company";

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
