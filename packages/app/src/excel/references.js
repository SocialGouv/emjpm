const references = {
  invalidCodePostal: ["75000"],
  residence: ["A domicile", "En établissement", "En établissement avec conservation du domicile"],
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
    "curatelle renforcée",
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

export default references;
