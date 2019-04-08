import references from "./references";

const REGEXP_CODE_POSTAL = /^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/;

export const isValidCodePostal = code_postal =>
  // force boolean
  code_postal
    ? !!(
        code_postal.toString().match(REGEXP_CODE_POSTAL) &&
        !references.invalidCodePostal.includes(code_postal.toString())
      )
    : true;

// check if value defined in references
const isValidValue = (value, key) => value && references[key].includes(value.toString());

const isValidResidence = residence => (residence ? isValidValue(residence, "residence") : true);
const isValidType = type => (type ? isValidValue(type, "type") : true);
const isValidCivilite = civilite => (civilite ? isValidValue(civilite, "civilite") : true);

const isValidDateOuverture = date => (date ? date.toString().match(/^\d\d\d\d-\d\d-\d\d/) : true);
const isValidAnnee = annee => (annee ? annee.toString().match(/^([12][0-9]{3})$/) : true);

// strictly valide data
export const validate = data => {
  let errors;

  const rows = data;

  if (rows.length === 0) {
    return {
      errors: {
        erreur: ["Aucune ligne importée"]
      }
    };
  }

  // group errors by row
  rows.map((datum, i) => {
    const rowMessages = [];
    if (!isValidDateOuverture(datum.date_ouverture)) {
      rowMessages.push(`Date d'ouverture non valide : "${datum.date_ouverture}"`);
    }
    // if (!isValidCodePostal(datum.code_postal)) {
    //   rowMessages.push(`Code Postal non valide : "${datum.code_postal}"`);
    // }
    if (!isValidResidence(datum.residence)) {
      rowMessages.push(`Résidence non valide : "${datum.residence}"`);
    }
    if (!isValidAnnee(datum.annee)) {
      rowMessages.push(`Année non valide : "${datum.annee}"`);
    }
    if (!isValidType(datum.type)) {
      rowMessages.push(`Type de mesure non valide : "${datum.type}"`);
    }
    if (!isValidCivilite(datum.civilite)) {
      rowMessages.push(`Genre non valide : "${datum.civilite}"`);
    }
    if (rowMessages.length) {
      if (!errors) {
        errors = {};
      }
      errors[`Ligne ${i + 2}`] = rowMessages;
    }
  });
  return {
    errors
  };
};

export default validate;
