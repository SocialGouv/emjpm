const references = {
  invalidCodePostal: ["75000"],
  residence: ["A Domicile", "En établissement", "En établissement avec conservation du domicile"],
  type: [
    "Curatelle",
    "Curatelle renforcée",
    "Curatelle renforcée à la personne",
    "Curatelle renforcée aux biens",
    "Curatelle renforcée aux biens et à la personne",
    "Curatelle simple",
    "Curatelle simple à la personne",
    "Curatelle simple aux biens",
    "Curatelle simple aux biens et à la personne",
    "MAJ",
    "Mesure ad hoc",
    "Sauvegarde de justice",
    "Sauvegarde de justice avec mandat spécial",
    "Tutelle",
    "Tutelle à la personne",
    "Tutelle aux biens",
    "Tutelle aux biens et à la personne"
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
