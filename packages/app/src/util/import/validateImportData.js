const REGEX_DATE_OUVERTURE = "^([0-2][0-9]|(3)[0-1])(/)((0[0-9])|(1[0-2]))(/)(([12][0-9]{3}))$";
const REGEX_ANNEE = "^([12][0-9]{3})$";
const REGEX_CODE_POSTAL = "^[0-9]{5}$";

export const HEADERS = [
  "date_ouverture",
  "type",
  "code_postal",
  "ville",
  "civilite",
  "annee",
  "numero_rg",
  "numero_dossier",
  "residence",
  "tribunal_siret"
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
  "A domicile",
  "En établissement",
  "En établissement avec conservation du domicile",
  "SDF"
];

export const CIVILITY = ["F", "H"];

// const validateHeaders = row => {
//   Object.keys(row)
//     .map((key, index) => {
//       if (row[key] !== HEADERS[index]) {
//         return `Le titre de la colonne '${index} n'est pas '${HEADERS[index]}'`;
//       }
//     })
//     .filter(Boolean);
// };

const validateType = ({ type }) => {
  if (!type) {
    return `Le type de la mesure est obligatoire`;
  }

  if (MESURE_TYPE.includes(type)) {
    return;
  }

  const typeInLowerCase = type.toLowerCase();

  for (const mesureType of MESURE_TYPE) {
    if (mesureType.toLowerCase() === typeInLowerCase) {
      type = mesureType;
      return;
    }
  }

  return `La valeur '${type}' n'est pas dans la liste: ${MESURE_TYPE}`;
};

const validateGender = ({ civilite }) => {
  if (!CIVILITY.includes(civilite)) {
    return `La valeur '${civilite}' n'est pas dans la liste: ${CIVILITY}`;
  }
};

const validateResidence = ({ residence }) => {
  if (!residence || RESIDENCE.includes(residence)) {
    return;
  }

  const residenceInLowerCase = residence.toLowerCase();

  for (const mesureResidence of RESIDENCE) {
    if (mesureResidence.toLowerCase() === residenceInLowerCase) {
      residence = mesureResidence;
      return;
    }
  }

  return `La valeur '${residence}' n'est pas dans la liste: ${RESIDENCE}`;
};

const validateDateOuverture = ({ date_ouverture }) => {
  if (!String(date_ouverture).match(REGEX_DATE_OUVERTURE)) {
    return `La date d'ouverture '${date_ouverture}' doit être au format 'jj/mm/aaaa'`;
  }
};

const validateAnnee = ({ annee }) => {
  if (!String(annee).match(REGEX_ANNEE)) {
    return `L'année '${annee}' doit être au format 'aaaa'`;
  }
};

const validateCodePostal = ({ code_postal }) => {
  if (!code_postal) {
    return;
  }

  if (!String(code_postal).match(REGEX_CODE_POSTAL)) {
    return `Le code postal '${code_postal}' doit être au format '75001'`;
  }
};

const validateNumeroRg = ({ numero_rg }) => {
  if (!numero_rg) {
    return `Le numéro RG est obligatoire`;
  }
};

const validateTribunalSiret = row => {
  if (!row.tribunal_siret) {
    return `Le SIRET du tribunal est obligatoire`;
  }
};

const rowValidators = [
  validateDateOuverture,
  validateCodePostal,
  validateAnnee,
  validateType,
  validateGender,
  validateNumeroRg,
  validateResidence,
  validateTribunalSiret
];

const initialState = {
  errors: [],
  mesures: []
};

export default data => {
  return data.reduce((state, row, index) => {
    const messages = rowValidators.map(validate => validate(row)).filter(Boolean);

    if (messages.length) {
      state.errors.push({ line: index + 1, messages, row });
    } else {
      state.mesures.push(row);
    }

    return state;
  }, initialState);
};
