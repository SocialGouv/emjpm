// const REGEXP_DATE_OUVERTURE = "^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)d{4}$";

const HEADER = [
  "date_ouverture",
  "type",
  "code_postal",
  "ville",
  "civilite",
  "annee",
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
  if (headers.length < 9) {
    errors.push("Le nombre de colonnes du fichier ne correspond pas au modèle de fichier");
  } else {
    if (headers[0] !== HEADER[0]) {
      errors.push("Le titre de la première colonne doit être 'date_ouverture'");
    } else if (headers[1] !== HEADER[1]) {
      errors.push("Le titre de la deuxième colonne doit être 'type'");
    } else if (headers[2] !== HEADER[2]) {
      errors.push("Le titre de la troisième colonne doit être 'code_postal'");
    } else if (headers[3] !== HEADER[3]) {
      errors.push("Le titre de la quatrième colonne doit être 'ville'");
    } else if (headers[4] !== HEADER[4]) {
      errors.push("Le titre de la cinquième colonne doit être 'civilite'");
    } else if (headers[5] !== HEADER[5]) {
      errors.push("Le titre de la sixième colonne doit être 'annee'");
    } else if (headers[6] !== HEADER[6]) {
      errors.push("Le titre de la septième colonne doit être 'numero_dossier'");
    } else if (headers[7] !== HEADER[7]) {
      errors.push("Le titre de la huitième colonne doit être 'residence'");
    }
  }
};

const checkType = (datas, errors) => {
  for (const row of datas) {
    if (!MESURE_TYPE.includes(row.type)) {
      errors.push(`Le type d'une mesure ne peut pas être '${row.type}'`);
    }
  }
};

const checkGender = (datas, errors) => {
  for (const row of datas) {
    if (!CIVILITY.includes(row.civilite)) {
      errors.push(`La civilité d'un majeur ne peut pas être '${row.civilite}'`);
    }
  }
};

const checkResidence = (datas, errors) => {
  for (const row of datas) {
    if (!RESIDENCE.includes(row.residence)) {
      errors.push(`La résidence d'un majeur ne peut pas être '${row.residence}'`);
    }
  }
};

export default datas => {
  const errors = [];

  checkHeaders(datas, errors);
  checkType(datas, errors);
  checkGender(datas, errors);
  checkResidence(datas, errors);

  // check code postal

  // check annee

  return errors;
};
