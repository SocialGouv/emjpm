import { enqueteKeysBuilder } from "./enqueteKeysBuilder.service";

export const PERSONNALITE_JURIDIQUE = enqueteKeysBuilder.buildKeys({
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
});

export const STATUTS = enqueteKeysBuilder.buildKeys({
  private: "Privé",
  public: "Public",
});

export const TYPES = enqueteKeysBuilder.buildKeys({
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
});
