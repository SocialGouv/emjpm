const REGEX_DATE_OUVERTURE = "^([0-2][0-9]|(3)[0-1])(/)((0[0-9])|(1[0-2]))(/)(([12][0-9]{3}))$";
const REGEX_ANNEE = "^([12][0-9]{3})$";
const REGEX_CODE_POSTAL = "^[0-9]{5}$";

const HEADER = [
  "date_ouverture",
  "type",
  "code_postal",
  "ville",
  "civilite",
  "annee",
  "numero_rg",
  "numero_dossier",
  "residence"
];

export const MESURE_TYPE = [
  "Curatelle",
  "Curatelle renforcée",
  "Curatelle renforcée à la personne",
  "Curatelle renforcée aux biens",
  "Curatelle renforcée aux biens et à la personne",
  "Curatelle simple",
  "Curatelle simple à la personne",
  "Curatelle simple aux biens",
  "Curatelle simple à la personne",
  "Curatelle simple aux biens et à la personne",
  "MAJ",
  "Mandat de protection future",
  "Mesure ad hoc",
  "Sauvegarde de justice",
  "Sauvegarde de justice avec mandat spécial",
  "Subrogé curateur",
  "Subrogé tuteur",
  "Tutelle",
  "Tutelle à la personne",
  "Tutelle aux biens",
  "Tutelle aux biens et à la personne"
];

export const RESIDENCE = [
  "A Domicile",
  "En établissement",
  "En établissement avec conservation du domicile",
  "SDF"
];

export const CIVILITY = ["F", "H"];

const checkHeaders = (datas, errors) => {
  const headers = Object.keys(datas);
  if (headers.length < HEADER.length) {
    errors.push("Le nombre de colonnes du fichier ne correspond pas au modèle de fichier");
  } else {
    for (let i = 0; i++; i < 8) {
      if (headers[i] !== HEADER[i]) {
        errors.push(`Le titre de la colonne '${i} n'est pas '${HEADER[i]}'`);
      }
    }
  }
};

const checkType = (row, errors) => {
  if (!MESURE_TYPE.includes(row.type)) {
    errors.push(`Les valeurs possible du type de mesure sont  '${MESURE_TYPE}'`);
  }
};

const checkGender = (row, errors) => {
  if (!CIVILITY.includes(row.civilite)) {
    errors.push(`Les valeurs possible de la civilité '${CIVILITY}'`);
  }
};

const checkResidence = (row, errors) => {
  if (!RESIDENCE.includes(row.residence)) {
    errors.push(`Les valeurs possibles de la résidence sont: ${RESIDENCE}`);
  }
};

const checkDateOuverture = (row, errors) => {
  const val = row.date_ouverture;
  if (!String(val).match(REGEX_DATE_OUVERTURE)) {
    errors.push(`La date d'ouverture '${val}' doit être au format 'jj/mm/aaaa'`);
  }
};

const checkAnnee = (row, errors) => {
  if (!String(row.annee).match(REGEX_ANNEE)) {
    errors.push(`L'année '${row.annee}' doit être au format 'aaaa'`);
  }
};

const checkCodePostal = (row, errors) => {
  if (!String(row.code_postal).match(REGEX_CODE_POSTAL)) {
    errors.push(`Le code postal '${row.code_postal}' doit être au format '75001'`);
  }
};

const checkNumeroRg = (row, errors) => {
  if (!row.numero_rg) {
    errors.push(`Le numéro RG est obligatoire`);
  }
};

export default datas => {
  const errors = [];
  datas.forEach((row, index) => {
    const errorMessages = [];
    checkHeaders(row, errorMessages);
    checkDateOuverture(row, errorMessages);
    checkCodePostal(row, errorMessages);
    checkAnnee(row, errorMessages);
    checkType(row, errorMessages);
    checkGender(row, errorMessages);
    checkNumeroRg(row, errorMessages);
    checkResidence(row, errorMessages);
    if (errorMessages.length > 0) {
      errors.push({
        line: index + 1,
        messages: errorMessages,
        row
      });
    }
  });
  console.log(errors);

  return errors;
};
