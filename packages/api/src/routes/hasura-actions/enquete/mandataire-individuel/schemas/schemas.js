const yup = require("yup");
const { ENQ_REP_AGREMENTS_FORMATIONS } = require("../../common/constants");

const informationsGeneralesMandataireSchema = yup.object().shape({
  nom: yup.string().required(),
  departement: yup.string().required(),
  region: yup.string().required(),
  benevole: yup.boolean().required(),
  forme_juridique: yup.string().when("benevole", {
    is: false,
    then: yup.string().required(),
    otherwise: yup.string().nullable()
  }),
  anciennete: yup.string().required(),
  estimation_etp: yup.string().required(),
  exerce_secretaires_specialises: yup.boolean().nullable(),
  secretaire_specialise_etp: yup.number().nullable(),
  local_professionnel: yup.boolean().required()
});

const informationsAgrementsMandataireSchema = yup.object().shape({
  annee_agrement: yup
    .number()
    .min(1900)
    .required(),
  nb_departements: yup
    .mixed()
    .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
    .required()
});

const informationsFormationMandataireSchema = yup.object().shape({
  cnc_annee_obtention: yup
    .number()
    .required()
    .positive()
    .integer(),
  cnc_heures_formation: yup
    .number()
    .required()
    .positive()
    .integer(),
  niveau_qualification: yup
    .number()
    .required()
    .min(1)
    .max(6)
    .integer()
});

[
  "curatelle_renforcee_etablissement_debut_annee",
  "curatelle_renforcee_etablissement_fin_annee",
  "curatelle_renforcee_domicile_debut_annee",
  "curatelle_renforcee_domicile_fin_annee",
  "curatelle_simple_etablissement_debut_annee",
  "curatelle_simple_etablissement_fin_annee",
  "curatelle_simple_domicile_debut_annee",
  "curatelle_simple_domicile_fin_annee",
  "tutelle_etablissement_debut_annee",
  "tutelle_etablissement_fin_annee",
  "tutelle_domicile_debut_annee",
  "tutelle_domicile_fin_annee",
  "accompagnement_judiciaire_etablissement_debut_annee",
  "accompagnement_judiciaire_etablissement_fin_annee",
  "accompagnement_judiciaire_domicile_debut_annee",
  "accompagnement_judiciaire_domicile_fin_annee",
  "curatelle_biens_etablissement_debut_annee",
  "curatelle_biens_etablissement_fin_annee",
  "curatelle_biens_domicile_debut_annee",
  "curatelle_biens_domicile_fin_annee",
  "curatelle_personne_etablissement_debut_annee",
  "curatelle_personne_etablissement_fin_annee",
  "curatelle_personne_domicile_debut_annee",
  "curatelle_personne_domicile_fin_annee",
  "revisions_main_levee",
  "revisions_masp",
  "revisions_reconduction",
  "revisions_changement",
  "revisions_autre",
  "sorties_main_levee",
  "sorties_deces",
  "sorties_masp",
  "curatelle_renforcee_etablissement_mesures_nouvelles",
  "curatelle_renforcee_etablissement_sortie_mesures",
  "curatelle_renforcee_domicile_mesures_nouvelles",
  "curatelle_renforcee_domicile_sortie_mesures",
  "curatelle_simple_etablissement_mesures_nouvelles",
  "curatelle_simple_etablissement_sortie_mesures",
  "curatelle_simple_domicile_mesures_nouvelles",
  "curatelle_simple_domicile_sortie_mesures",
  "tutelle_etablissement_mesures_nouvelles",
  "tutelle_etablissement_sortie_mesures",
  "tutelle_domicile_mesures_nouvelles",
  "tutelle_domicile_sortie_mesures",
  "accompagnement_judiciaire_etablissement_mesures_nouvelles",
  "accompagnement_judiciaire_etablissement_sortie_mesures",
  "accompagnement_judiciaire_domicile_mesures_nouvelles",
  "accompagnement_judiciaire_domicile_sortie_mesures",
  "curatelle_biens_etablissement_mesures_nouvelles",
  "curatelle_biens_etablissement_sortie_mesures",
  "curatelle_biens_domicile_mesures_nouvelles",
  "curatelle_biens_domicile_sortie_mesures",
  "curatelle_personne_etablissement_mesures_nouvelles",
  "curatelle_personne_etablissement_sortie_mesures",
  "curatelle_personne_domicile_mesures_nouvelles",
  "curatelle_personne_domicile_sortie_mesures",
  "subroge_tuteur_createur_debut_annee",
  "subroge_tuteur_createur_mesures_nouvelles",
  "subroge_tuteur_createur_sortie_mesures",
  "subroge_tuteur_createur_fin_annee",
  "sauvegarde_justice_debut_annee",
  "sauvegarde_justice_mesures_nouvelles",
  "sauvegarde_justice_sortie_mesures",
  "sauvegarde_justice_fin_annee",
  "mandat_adhoc_majeur_debut_annee",
  "mandat_adhoc_majeur_mesures_nouvelles",
  "mandat_adhoc_majeur_sortie_mesures",
  "mandat_adhoc_majeur_fin_annee"
];

// TODO
const prestationsSocialesSchema = yup.object({});

// TODO
const populationsSchema = yup.object({});

module.exports = {
  informationsGeneralesMandataireSchema,
  informationsAgrementsMandataireSchema,
  informationsFormationMandataireSchema,
  prestationsSocialesSchema,
  populationsSchema
};
