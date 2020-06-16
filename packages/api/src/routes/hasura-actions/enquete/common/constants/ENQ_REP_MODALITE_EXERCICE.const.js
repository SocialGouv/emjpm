const enqueteKeysBuilder = require("./enqueteKeysBuilder.service");

const ENQ_REP_MODALITE_EXERCICE = {
  PERSONNALITE_JURIDIQUE: enqueteKeysBuilder.buildKeys({
    etat_ou_collectivite: "Etat ou collectivité locale",
    etablissement_public_hospitalisation:
      "Etablissement public d'hospitalisation",
    ccas: "CCAS",
    groupement_public: "Groupement public (SIH, GCS, GCSMS, GIP, GIE)",
    etablissement_public_social: "Etablissement public social ou médico-social",
    etablissement_public_autre: "Autre type d'établissement public",
    etablissement_public_industriel_commercial:
      "Etablissement public à caractère industriel et commercial",
    organisme_prive_non_lucratif:
      "Organisme privé à but non lucratif (dont CG privés)",
    organisme_prive_commercial: "Organisme privé à caractère commercial",
  }),
  TYPE_ETABLISSEMENT: enqueteKeysBuilder.buildKeys({
    etablissement_personnes_agees: "Etablissement pour personnes âgées",
    etablissement_personnes_handicapees:
      "Etablissement pour personnes handicapées",
    etablissement_autre_social:
      "Autre type d'établissement social ou médico-social",
    etablissement_specialise_psychiatrie:
      "Etablissement spécialisé en psychiatrie",
    etablissement_soins_longue_duree:
      "Etablissement assurant des soins de longue durée",
    etablissement_autre: "Autre type d'établissement hospitalier",
  }),
  STATUT_ETABLISSEMENT: enqueteKeysBuilder.buildKeys({
    public: "Public",
    private: "Privé",
  }),
};

module.exports = {
  ENQ_REP_MODALITE_EXERCICE,
};
