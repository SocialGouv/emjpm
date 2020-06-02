import gql from "graphql-tag";

// prefix: 'curatelle_simple' | 'curatelle_renforcee' | 'curatelle_personne' | 'tutelle' | 'curatelle_biens' | 'accompagnement_judiciaire
function buildEnqueteQuery(prefix) {
  return gql`
    query enquete_reponses_activite_${prefix}($id: Int!) {
      enquete_reponses_activite_by_pk(id: $id) {
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

export const ENQUETE_CURATELLE_SIMPLE = buildEnqueteQuery("curatelle_simple");

export const ENQUETE_CURATELLE_RENFORCEE = buildEnqueteQuery("curatelle_renforcee");

export const ENQUETE_CURATELLE_PERSONNE = buildEnqueteQuery("curatelle_personne");

export const ENQUETE_CURATELLE_BIENS = buildEnqueteQuery("curatelle_biens");

export const ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE = buildEnqueteQuery("accompagnement_judiciaire");

export const ENQUETE_TUTELLE = buildEnqueteQuery("tutelle");

export const ENQUETE_REVISION_MESURES = gql`
  query enquete_reponses_activite_revision_mesures($id: Int!) {
    enquete_reponses_activite_by_pk(id: $id) {
      revisions_main_levee
      revisions_masp
      revisions_reconduction
      revisions_changement
      revisions_autre
    }
  }
`;
