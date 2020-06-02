import gql from "graphql-tag";

// prefix: 'curatelle_simple' | 'curatelle_renforcee' | 'curatelle_personne' | 'tutelle' | 'curatelle_biens' | 'accompagnement_judiciaire
function buildEnqueteEtablissementDomicileUpdateMutation(prefix) {
  return gql`
    mutation update_enquete_activite_${prefix}(
      $id: Int!
      $etablissementDebutAnnee: Int
      $etablissementFinAnnee: Int
      $domicileDebutAnnee: Int
      $domicileFinAnnee: Int
      $etablissementMesuresNouvelles: Int
      $etablissementSortieMesures: Int
      $domicileMesuresNouvelles: Int
      $domicileSortieMesures: Int
    ) {
      update_enquete_reponses_activite_by_pk(
        pk_columns: { id: $id }
        _set: {
          ${prefix}_etablissement_debut_annee: $etablissementDebutAnnee
          ${prefix}_etablissement_fin_annee: $etablissementFinAnnee
          ${prefix}_domicile_debut_annee: $domicileDebutAnnee
          ${prefix}_domicile_fin_annee: $domicileFinAnnee
          ${prefix}_etablissement_mesures_nouvelles: $etablissementMesuresNouvelles
          ${prefix}_etablissement_sortie_mesures: $etablissementSortieMesures
          ${prefix}_domicile_mesures_nouvelles: $domicileMesuresNouvelles
          ${prefix}_domicile_sortie_mesures: $domicileSortieMesures
        }
      ) {
        id
        ${prefix}_etablissement_debut_annee
        ${prefix}_etablissement_fin_annee
        ${prefix}_domicile_debut_annee
        ${prefix}_domicile_fin_annee
        ${prefix}_etablissement_mesures_nouvelles
        ${prefix}_etablissement_sortie_mesures
        ${prefix}_domicile_mesures_nouvelles
        ${prefix}_domicile_sortie_mesures
      }
    }
  `;
}

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_SIMPLE = buildEnqueteEtablissementDomicileUpdateMutation(
  "curatelle_simple"
);

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_RENFORCEE = buildEnqueteEtablissementDomicileUpdateMutation(
  "curatelle_renforcee"
);

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_PERSONNE = buildEnqueteEtablissementDomicileUpdateMutation(
  "curatelle_personne"
);

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_BIENS = buildEnqueteEtablissementDomicileUpdateMutation(
  "curatelle_biens"
);

export const UPDATE_ENQUETE_ACTIVITE_ACCOMPAGNEMENT_JUDICIAIRE = buildEnqueteEtablissementDomicileUpdateMutation(
  "accompagnement_judiciaire"
);

export const UPDATE_ENQUETE_ACTIVITE_TUTELLE = buildEnqueteEtablissementDomicileUpdateMutation(
  "tutelle"
);

export const UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES = gql`
  mutation update_enquete_activite_curatelle_biens(
    $id: Int!
    $revisionsMainLevee: Int
    $revisionsMasp: Int
    $revisionsReconduction: Int
    $revisionsChangement: Int
    $revisionsAutre: Int
  ) {
    update_enquete_activite_reponses_activite_by_pk(
      pk_columns: { id: $id }
      _set: {
        revisions_main_levee: $revisionsMainLevee
        revisions_masp: $revisionsMasp
        revisions_reconduction: $revisionsReconduction
        revisions_changement: $revisionsChangement
        revisions_autre: $revisionsAutre
      }
    ) {
      id
      revisions_main_levee
      revisions_masp
      revisions_reconduction
      revisions_changement
      revisions_autre
    }
  }
`;

// prefix: 'subroge_tuteur_createur' | 'sauvegarde_justice' | 'mandat_adhoc_majeur'
function buildEnqueteMesuresUpdateMutation(prefix) {
  return gql`
    mutation update_enquete_activite_${prefix}(
      $id: Int!
      $debutAnnee: Int
      $finAnnee: Int
      $mesuresNouvelles: Int
      $sortieMesures: Int
    ) {
      update_enquete_reponses_activite_by_pk(
        pk_columns: { id: $id }
        _set: {
          ${prefix}_debut_annee: $debutAnnee
          ${prefix}_fin_annee: $finAnnee
          ${prefix}_mesures_nouvelles: $mesuresNouvelles
          ${prefix}_sortie_mesures: $sortieMesures
        }
      ) {
        id
        ${prefix}_debut_annee
        ${prefix}_fin_annee
        ${prefix}_mesures_nouvelles
        ${prefix}_sortie_mesures
      }
    }
  `;
}
export const UPDATE_ENQUETE_SUBROGE_TUTEUR_CREATEUR = buildEnqueteMesuresUpdateMutation(
  "subroge_tuteur_createur"
);
