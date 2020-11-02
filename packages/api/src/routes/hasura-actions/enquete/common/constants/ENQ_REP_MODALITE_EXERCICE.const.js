const enqueteKeysBuilder = require("./enqueteKeysBuilder.service");

const ENQ_REP_MODALITE_EXERCICE = {
  ACTIVE_EXERCEE_PAR: enqueteKeysBuilder.buildKeys({
    "personne-physique": "Une personne physique",
    service: "Un service au sens de l'article L312-1 du CASF",
  }),
  ETABLISSEMENTS_TYPE: enqueteKeysBuilder.buildKeys({
    "convention-groupement":
      "Plusieurs établissements dans le cadre d'une convention ou d'un groupement (SIH, GCS, GCSMS, GIP).",
    "personne-morale":
      "Un ou plusieurs établissements dépendant de la même personne morale.",
  }),
  PERSONNALITE_JURIDIQUE: enqueteKeysBuilder.buildKeys({
    ccas: "CCAS",
    etablissement_public_autre: "Autre type d'établissement public",
    etablissement_public_hospitalisation:
      "Etablissement public d'hospitalisation",
    etablissement_public_industriel_commercial:
      "Etablissement public à caractère industriel et commercial",
    etablissement_public_social: "Etablissement public social ou médico-social",
    etat_ou_collectivite: "Etat ou collectivité locale",
    groupement_public: "Groupement public (SIH, GCS, GCSMS, GIP, GIE)",
    organisme_prive_commercial: "Organisme privé à caractère commercial",
    organisme_prive_non_lucratif:
      "Organisme privé à but non lucratif (dont CG privés)",
  }),
  STATUT_ETABLISSEMENT: enqueteKeysBuilder.buildKeys({
    private: "Privé",
    public: "Public",
  }),
  TYPE_ETABLISSEMENT: enqueteKeysBuilder.buildKeys({
    etablissement_autre: "Autre type d'établissement hospitalier",
    etablissement_autre_social:
      "Autre type d'établissement social ou médico-social",
    etablissement_personnes_agees: "Etablissement pour personnes âgées",
    etablissement_personnes_handicapees:
      "Etablissement pour personnes handicapées",
    etablissement_soins_longue_duree:
      "Etablissement assurant des soins de longue durée",
    etablissement_specialise_psychiatrie:
      "Etablissement spécialisé en psychiatrie",
  }),
};

module.exports = {
  ENQ_REP_MODALITE_EXERCICE,
};
