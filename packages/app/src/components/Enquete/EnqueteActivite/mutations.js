import gql from "graphql-tag";

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_RENFORCEE = gql`
  mutation update_enquete_activite_curatelle_renforcee(
    $id: Int!
    $etablissementDebutAnnee: Int
    $etablissementFinAnnee: Int
    $domicileDebutAnnee: Int
    $domicileFinAnnee: Int
  ) {
    update_enquete_reponses_activite_by_pk(
      pk_columns: { id: $id }
      _set: {
        curatelle_renforcee_etablissement_debut_annee: $etablissementDebutAnnee
        curatelle_renforcee_etablissement_fin_annee: $etablissementFinAnnee
        curatelle_renforcee_domicile_debut_annee: $domicileDebutAnnee
        curatelle_renforcee_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      id
      curatelle_renforcee_etablissement_debut_annee
      curatelle_renforcee_etablissement_fin_annee
      curatelle_renforcee_domicile_debut_annee
      curatelle_renforcee_domicile_fin_annee
    }
  }
`;

export const UPDATE_ENQUETE_ACTIVITE_ACCOMPAGNEMENT_JUDICIAIRE = gql`
  mutation update_enquete_activite_tutelle(
    $id: Int!
    $etablissementDebutAnnee: Int
    $etablissementFinAnnee: Int
    $domicileDebutAnnee: Int
    $domicileFinAnnee: Int
  ) {
    update_enquete_reponses_activite_by_pk(
      pk_columns: { id: $id }
      _set: {
        accompagnement_judiciaire_etablissement_debut_annee: $etablissementDebutAnnee
        accompagnement_judiciaire_etablissement_fin_annee: $etablissementFinAnnee
        accompagnement_judiciaire_domicile_debut_annee: $domicileDebutAnnee
        accompagnement_judiciaire_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      accompagnement_judiciaire_etablissement_debut_annee
      accompagnement_judiciaire_etablissement_fin_annee
      accompagnement_judiciaire_domicile_debut_annee
      accompagnement_judiciaire_domicile_fin_annee
    }
  }
`;

export const UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES = gql`
  mutation update_enquete_activite_curatelle_biens(
    $id: Int!
    $revisionsMainLevee: Int
    $revisionsMasp: Int
    $revisionsReconduction: Int
    $revisionsChangement: Int
    $revisionsAutre: Int
  ) {
    update_enquete_reponses_activite_by_pk(
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

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_BIENS = gql`
  mutation update_enquete_activite_curatelle_biens(
    $id: Int!
    $etablissementDebutAnnee: Int
    $etablissementFinAnnee: Int
    $domicileDebutAnnee: Int
    $domicileFinAnnee: Int
  ) {
    update_enquete_reponses_activite_by_pk(
      pk_columns: { id: $id }
      _set: {
        curatelle_biens_etablissement_debut_annee: $etablissementDebutAnnee
        curatelle_biens_etablissement_fin_annee: $etablissementFinAnnee
        curatelle_biens_domicile_debut_annee: $domicileDebutAnnee
        curatelle_biens_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      id
      curatelle_biens_etablissement_debut_annee
      curatelle_biens_etablissement_fin_annee
      curatelle_biens_domicile_debut_annee
      curatelle_biens_domicile_fin_annee
    }
  }
`;

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_PERSONNE = gql`
  mutation update_enquete_activite_curatelle_personne(
    $id: Int!
    $etablissementDebutAnnee: Int
    $etablissementFinAnnee: Int
    $domicileDebutAnnee: Int
    $domicileFinAnnee: Int
  ) {
    update_enquete_reponses_activite_by_pk(
      pk_columns: { id: $id }
      _set: {
        curatelle_personne_etablissement_debut_annee: $etablissementDebutAnnee
        curatelle_personne_etablissement_fin_annee: $etablissementFinAnnee
        curatelle_personne_domicile_debut_annee: $domicileDebutAnnee
        curatelle_personne_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      id
      curatelle_personne_etablissement_debut_annee
      curatelle_personne_etablissement_fin_annee
      curatelle_personne_domicile_debut_annee
      curatelle_personne_domicile_fin_annee
    }
  }
`;

export const UPDATE_ENQUETE_ACTIVITE_TUTELLE = gql`
  mutation update_enquete_activite_tutelle(
    $id: Int!
    $etablissementDebutAnnee: Int
    $etablissementFinAnnee: Int
    $domicileDebutAnnee: Int
    $domicileFinAnnee: Int
  ) {
    update_enquete_reponses_activite_by_pk(
      pk_columns: { id: $id }
      _set: {
        tutelle_etablissement_debut_annee: $etablissementDebutAnnee
        tutelle_etablissement_fin_annee: $etablissementFinAnnee
        tutelle_domicile_debut_annee: $domicileDebutAnnee
        tutelle_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      id
      tutelle_etablissement_debut_annee
      tutelle_etablissement_fin_annee
      tutelle_domicile_debut_annee
      tutelle_domicile_fin_annee
    }
  }
`;

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_SIMPLE = gql`
  mutation update_enquete_activite_curatelle_simple(
    $id: Int!
    $etablissementDebutAnnee: Int
    $etablissementFinAnnee: Int
    $domicileDebutAnnee: Int
    $domicileFinAnnee: Int
  ) {
    update_enquete_reponses_activite_by_pk(
      pk_columns: { id: $id }
      _set: {
        curatelle_simple_domicile_debut_annee: $domicileDebutAnnee
        curatelle_simple_domicile_fin_annee: $domicileFinAnnee
        curatelle_simple_etablissement_debut_annee: $etablissementDebutAnnee
        curatelle_simple_etablissement_fin_annee: $etablissementFinAnnee
      }
    ) {
      id
      curatelle_simple_domicile_debut_annee
      curatelle_simple_domicile_fin_annee
      curatelle_simple_etablissement_debut_annee
      curatelle_simple_etablissement_fin_annee
    }
  }
`;
