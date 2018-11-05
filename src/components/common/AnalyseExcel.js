// Begining of analyse Excel: Not use for now

export const INVALID_CODE_POSTAL = ["75000"];
export const VALID_RESIDENCES = ["A Domicile", "En établissement"];
export const VALID_TYPES = [
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
  "sauvegarde de justice",
  "sauvegarde de justice avec mandat spécial"
];

export const VALID_CIVILITES = ["F", "H"];

const MANDATORY_COLUMNS = [
  "date_ouverture",
  "type",
  "code_postal",
  "ville",
  "civilite",
  "annee",
  "numero_dossier",
  "residence"
];

const REGEXP_CODE_POSTAL = /^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/;

export const isValidCodePostal = code_postal =>
  // force boolean
  !!(
    code_postal &&
    code_postal.toString().match(REGEXP_CODE_POSTAL) &&
    !INVALID_CODE_POSTAL.includes(code_postal.toString())
  );

// convert XLSX.utils.sheet_to_json data
export const cleanInputData = dataInput => {
  const cols = dataInput[0];
  const isValidColumn = col => MANDATORY_COLUMNS.includes(col);
  // convert Array of arrays into Array of Objects and filters only needed importable keys
  return dataInput
    .map(row =>
      row.reduce((a, c, i) => ({ ...a, ...(isValidColumn(cols[i]) ? { [cols[i]]: c } : {}) }), {})
    )
    .map(row => ({
      ...row,
      date_ouverture: new Date((row.date_ouverture - (25567 + 2)) * 86400 * 1000)
    }));
};

export const isValidResidence = residence =>
  residence && residence.toString().includes(VALID_RESIDENCES);

export const isValidAnnee = annee => annee && annee.toString().match(/^([12][0-9]){3}$/);
export const isValidType = type => type && type.toString().includes(VALID_TYPES);
export const isValidCivilite = civilite =>
  civilite && civilite.toString().includes(VALID_CIVILITES);

export const validateData = data => {
  const messages = {};
  const colums = Object.keys(data[0]);

  const absentColumns = MANDATORY_COLUMNS.filter(col => colums.indexOf(col) === -1);
  if (absentColumns.length) {
    messages.push(`Les colonnes suivants sont introuvables : ${absentColumns.join(", ")}`);
  }
  // group messages by row
  const rows = data.slice(1);
  rows.map((datum, i) => {
    const rowMessages = [];
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
    if (rowMessages.length) messages[`Ligne ${i + 1}`] = rowMessages;
  });
  return messages;
};

export default validateData;
