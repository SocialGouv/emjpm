// Begining of analyse Excel: Not use for now

const unvalidCodePostal = ["75000"];
const validResidence = ["A Domicile", "En établissement"];
const validType = [
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
const validCivilite = ["F", "H"];

const analyseExel = (data, defaultColumns = [], colums) => {
  const message = [];
  console.log("data", data);
  const allColumnsPresent = defaultColumns.filter(col => colums.indexOf(col) === -1);
  console.log("data1", data);
  const CodePostal = data.slice(1).map((datum, i) => {
    if (
      (datum.code_postal &&
        !datum.code_postal.toString().match(/^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/)) ||
      !datum.code_postal.toString().includes(unvalidCodePostal)
    ) {
      message.push(`Code Postal non valide ligne ${i + 1}`);
    }
  });

  console.log("data2", data);
  const Residence = data.slice(1).map((datum, i) => {
    if (datum.residence && !datum.residence.toString().includes(validResidence)) {
      return message.push(`Résidence non valide ligne ${i + 1}`);
    }
  });
  const Annee = data.slice(1).map((datum, i) => {
    if (datum.annee && !datum.annee.toString().match(/^([0-9]){4}$/)) {
      return message.push(`Année non valide ligne ${i + 1}`);
    }
  });
  const Type = data.slice(1).map((datum, i) => {
    if (datum.type && !datum.type.toString().includes(validType)) {
      return message.push(`Type mesure non valide ligne ${i + 1}`);
    }
  });
  const Civilite = data.slice(1).map((datum, i) => {
    if (datum.civilite && !datum.civilite.toString().includes(validCivilite)) {
      return message.push(`Genre non valide ligne ${i + 1}`);
    }
  });

  console.log("me", message)
  return message;
};

export default analyseExel;
