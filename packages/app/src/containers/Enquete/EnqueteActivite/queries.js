import gql from "graphql-tag";

// prefix: 'curatelle_simple' | 'curatelle_renforcee' | 'curatelle_personne' | 'tutelle' | 'curatelle_biens' | 'accompagnement_judiciaire'
function buildEnqueteEtablissementDomicileQuery(prefix) {
  return gql`
    query enquete_reponses_activite_${prefix}($id: Int!) {
      enquete_reponses_activite(where: {enquete_reponses_id: {_eq: $id}}) {
        ${prefix}_domicile_debut_annee
        ${prefix}_domicile_fin_annee
        ${prefix}_etablissement_debut_annee
        ${prefix}_etablissement_fin_annee
        ${prefix}_etablissement_mesures_nouvelles
        ${prefix}_etablissement_sortie_mesures
        ${prefix}_domicile_mesures_nouvelles
        ${prefix}_domicile_sortie_mesures
      }
    }
  `;
}

export const ENQUETE_CURATELLE_SIMPLE = buildEnqueteEtablissementDomicileQuery(
  "curatelle_simple"
);

export const ENQUETE_CURATELLE_RENFORCEE = buildEnqueteEtablissementDomicileQuery(
  "curatelle_renforcee"
);

export const ENQUETE_CURATELLE_PERSONNE = buildEnqueteEtablissementDomicileQuery(
  "curatelle_personne"
);

export const ENQUETE_CURATELLE_BIENS = buildEnqueteEtablissementDomicileQuery(
  "curatelle_biens"
);

export const ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE = buildEnqueteEtablissementDomicileQuery(
  "accompagnement_judiciaire"
);

export const ENQUETE_TUTELLE = buildEnqueteEtablissementDomicileQuery(
  "tutelle"
);

// prefix: 'subroge_tuteur_createur' | 'sauvegarde_justice' | 'mandat_adhoc_majeur'
function buildEnqueteMesuresQuery(prefix) {
  return gql`
    query enquete_reponses_activite_${prefix}($id: Int!) {
      enquete_reponses_activite(where: {enquete_reponses_id: {_eq: $id}}) {
        ${prefix}_debut_annee
        ${prefix}_fin_annee
        ${prefix}_mesures_nouvelles
        ${prefix}_sortie_mesures
      }
    }
  `;
}
export const ENQUETE_SUBROGE_TUTEUR_CREATEUR = buildEnqueteMesuresQuery(
  "subroge_tuteur_createur"
);
export const ENQUETE_MANDAT_ADHOC_MAJEUR = buildEnqueteMesuresQuery(
  "mandat_adhoc_majeur"
);
export const ENQUETE_SAUVEGARDE_JUSTICE = buildEnqueteMesuresQuery(
  "sauvegarde_justice"
);

export const ENQUETE_REVISION_MESURES = gql`
  query enquete_reponses_activite_revision_mesures($id: Int!) {
    enquete_reponses_activite(where: { enquete_reponses_id: { _eq: $id } }) {
      revisions_main_levee
      revisions_masp
      revisions_reconduction
      revisions_changement
      revisions_autre
    }
  }
`;

export const ENQUETE_CAUSES_SORTIE_DISPOSITIF = gql`
  query enquete_reponses_activite_causes_sortie_dispositif($id: Int!) {
    enquete_reponses_activite(where: { enquete_reponses_id: { _eq: $id } }) {
      sorties_main_levee
      sorties_deces
      sorties_masp
    }
  }
`;
