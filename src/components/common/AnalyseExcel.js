// Begining of analyse Excel: Not use for now
import memoize from "memoizee";
import Fuse from "fuse.js";
import { format } from "date-fns";

export const references = {
  invalidCodePostal: ["75000"],
  residence: ["A domicile", "En établissement"],
  type: [
    "Tutelle",
    "Curatelle",
    "Sauvegarde de justice",
    "Mesure ad hoc",
    "MAJ",
    "tutelle aux biens",
    "tutelle à la personne",
    "tutelle aux biens et à la personne",
    "curatelle simple aux biens",
    "curatelle simple à la personne",
    "curatelle simple aux biens et à la personne",
    "curatelle renforcée aux biens",
    "curatelle renforcée à la personne",
    "curatelle renforcée aux biens et à la personne",
    "sauvegarde de justice avec mandat spécial"
  ],
  civilite: ["F", "H", "Homme", "Femme"],
  mandatoryColumns: [
    "date_ouverture",
    "type",
    "code_postal",
    "ville",
    "civilite",
    "annee",
    "numero_dossier",
    "residence"
  ]
};

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.7,
  tokenize: true,
  keys: ["value"]
};

// memoize basic fuser for some data
const memoFuse = memoize(data => new Fuse(data, FUSE_OPTIONS));

// fuse some input with some data
const findBestMatch = (data, input) => {
  const fuse = memoFuse(data);
  const result = fuse.search(input);
  if (result.length) {
    return result[0].value;
  }
};

const REGEXP_CODE_POSTAL = /^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/;

export const isValidCodePostal = code_postal =>
  // force boolean
  code_postal
    ? !!(
        code_postal.toString().match(REGEXP_CODE_POSTAL) &&
        !references.invalidCodePostal.includes(code_postal.toString())
      )
    : true;

// convert flat array to object for fuse.js
const getColumnFuseValues = columnName => {
  const columnsValues = references[columnName];
  if (columnsValues) {
    return columnsValues.map(value => ({ value }));
  }
};

// ensure some values are defined
const hasValues = obj => Object.values(obj).length > 0;

// excel leap year bug https://gist.github.com/christopherscott/2782634
const excelToEpoch = excelDate => {
  if (isNaN(excelDate)) {
    return excelDate;
  }
  return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
};

const cleanCivilite = civilite => {
  switch (civilite) {
    case "Femme":
      return "F";
    case "Homme":
      return "H";
    default:
      return civilite;
  }
};

// convert XLSX.utils.sheet_to_json data
// only include relevant columns and normalize the input
export const cleanInputData = dataInput => {
  const cols = dataInput[0];
  const isValidColumn = col => references.mandatoryColumns.includes(col);
  const getColumnIfValid = (columnIndex, value) => {
    const columnName = cols[columnIndex];
    const matchValue = getMatchValue(columnName, value);
    if (isValidColumn(columnName)) {
      return { [columnName]: matchValue };
    }
    return {};
  };
  // fuse the input
  const getMatchValue = (columnName, value) => {
    // Note: `return value` here to disable fusing
    const columnValues = getColumnFuseValues(columnName);
    if (columnValues) {
      return findBestMatch(columnValues, value) || value;
    }
    return value;
  };

  // convert Array of arrays into Array of Objects and filters only needed importable keys
  return (
    dataInput
      // keep first row (columns) intact
      .filter((row, i) => i > 0)
      // convert rows to normalized object
      .map(row =>
        row.reduce(
          // only adds the value if its a valid column
          (values, current, index) => ({ ...values, ...getColumnIfValid(index, current) }),
          {}
        )
      )
      .filter(hasValues)
      // some post processing
      .map(row => ({
        ...row,
        date_ouverture: format(excelToEpoch(row.date_ouverture), "YYYY-MM-DD"),
        civilite: cleanCivilite(row.civilite)
      }))
  );
};

// check if value defined in references
const isValidValue = (value, key) => value && references[key].includes(value.toString());

const isValidResidence = residence => (residence ? isValidValue(residence, "residence") : true);
const isValidType = type => (type ? isValidValue(type, "type") : true);
const isValidCivilite = civilite => (civilite ? isValidValue(civilite, "civilite") : true);

const isValidDateOuverture = date => (date ? date.toString().match(/^\d\d\d\d-\d\d-\d\d/) : true);
const isValidAnnee = annee => (annee ? annee.toString().match(/^([12][0-9]{3})$/) : true);

// strictly valide data
export const validateData = data => {
  let errors;
  const colums = Object.keys(data[0]);

  //adrien: rm check columns because all mandataires don't have all columns in excel
  /*
  const absentColumns = references.mandatoryColumns.filter(col => !colums.includes(col));
  if (absentColumns.length) {
    if (!errors) {
      errors = {};
    }
    errors["En-têtes"] = [`Les colonnes suivants sont introuvables : ${absentColumns.join(", ")}`];
  }
  */

  const rows = data;

  // group errors by row
  rows.map((datum, i) => {
    const rowMessages = [];
    if (!isValidDateOuverture(datum.date_ouverture)) {
      rowMessages.push(`Date d'ouverture non valide : "${datum.date_ouverture}"`);
    }
    if (!isValidCodePostal(datum.code_postal)) {
      rowMessages.push(`Code Postal non valide : "${datum.code_postal}"`);
    }
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

export default validateData;
