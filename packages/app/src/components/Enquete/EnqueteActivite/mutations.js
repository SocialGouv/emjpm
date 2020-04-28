import gql from "graphql-tag";

export const UPDATE_ENQUETE_ACTIVITE_CURATELLE_RENFORCEE = gql`
  mutation update_enquete_activite_curatelle_renforcee(
    $id: Int!
    $etablissementDebutAnnee: Int
    $etablissementFinAnnee: Int
    $domicileDebutAnnee: Int
    $domicileFinAnnee: Int
  ) {
    update_enquete_reponses(
      where: { id: { _eq: $id } }
      _set: {
        activite_curatelle_renforcee_etablissement_debut_annee: $etablissementDebutAnnee
        activite_curatelle_renforcee_etablissement_fin_annee: $etablissementFinAnnee
        activite_curatelle_renforcee_domicile_debut_annee: $domicileDebutAnnee
        activite_curatelle_renforcee_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      affected_rows
      returning {
        id
        activite_curatelle_renforcee_etablissement_debut_annee
        activite_curatelle_renforcee_etablissement_fin_annee
        activite_curatelle_renforcee_domicile_debut_annee
        activite_curatelle_renforcee_domicile_fin_annee
      }
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
    update_enquete_reponses(
      where: { id: { _eq: $id } }
      _set: {
        activite_accompagnement_judiciaire_etablissement_debut_annee: $etablissementDebutAnnee
        activite_accompagnement_judiciaire_etablissement_fin_annee: $etablissementFinAnnee
        activite_accompagnement_judiciaire_domicile_debut_annee: $domicileDebutAnnee
        activite_accompagnement_judiciaire_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      affected_rows
      returning {
        id
        activite_accompagnement_judiciaire_etablissement_debut_annee
        activite_accompagnement_judiciaire_etablissement_fin_annee
        activite_accompagnement_judiciaire_domicile_debut_annee
        activite_accompagnement_judiciaire_domicile_fin_annee
      }
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
    update_enquete_reponses(
      where: { id: { _eq: $id } }
      _set: {
        activite_revisions_main_levee: $revisionsMainLevee
        activite_revisions_masp: $revisionsMasp
        activite_revisions_reconduction: $revisionsReconduction
        activite_revisions_changement: $revisionsChangement
        activite_revisions_autre: $revisionsAutre
      }
    ) {
      affected_rows
      returning {
        id
        activite_revisions_main_levee
        activite_revisions_masp
        activite_revisions_reconduction
        activite_revisions_changement
        activite_revisions_autre
      }
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
    update_enquete_reponses(
      where: { id: { _eq: $id } }
      _set: {
        activite_curatelle_biens_etablissement_debut_annee: $etablissementDebutAnnee
        activite_curatelle_biens_etablissement_fin_annee: $etablissementFinAnnee
        activite_curatelle_biens_domicile_debut_annee: $domicileDebutAnnee
        activite_curatelle_biens_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      affected_rows
      returning {
        id
        activite_curatelle_biens_etablissement_debut_annee
        activite_curatelle_biens_etablissement_fin_annee
        activite_curatelle_biens_domicile_debut_annee
        activite_curatelle_biens_domicile_fin_annee
      }
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
    update_enquete_reponses(
      where: { id: { _eq: $id } }
      _set: {
        activite_curatelle_personne_etablissement_debut_annee: $etablissementDebutAnnee
        activite_curatelle_personne_etablissement_fin_annee: $etablissementFinAnnee
        activite_curatelle_personne_domicile_debut_annee: $domicileDebutAnnee
        activite_curatelle_personne_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      affected_rows
      returning {
        id
        activite_curatelle_personne_etablissement_debut_annee
        activite_curatelle_personne_etablissement_fin_annee
        activite_curatelle_personne_domicile_debut_annee
        activite_curatelle_personne_domicile_fin_annee
      }
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
    update_enquete_reponses(
      where: { id: { _eq: $id } }
      _set: {
        activite_tutelle_etablissement_debut_annee: $etablissementDebutAnnee
        activite_tutelle_etablissement_fin_annee: $etablissementFinAnnee
        activite_tutelle_domicile_debut_annee: $domicileDebutAnnee
        activite_tutelle_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      affected_rows
      returning {
        id
        activite_tutelle_etablissement_debut_annee
        activite_tutelle_etablissement_fin_annee
        activite_tutelle_domicile_debut_annee
        activite_tutelle_domicile_fin_annee
      }
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
    update_enquete_reponses(
      where: { id: { _eq: $id } }
      _set: {
        activite_curatelle_simple_etablissement_debut_annee: $etablissementDebutAnnee
        activite_curatelle_simple_etablissement_fin_annee: $etablissementFinAnnee
        activite_curatelle_simple_domicile_debut_annee: $domicileDebutAnnee
        activite_curatelle_simple_domicile_fin_annee: $domicileFinAnnee
      }
    ) {
      affected_rows
      returning {
        id
        activite_curatelle_simple_etablissement_debut_annee
        activite_curatelle_simple_etablissement_fin_annee
        activite_curatelle_simple_domicile_debut_annee
        activite_curatelle_simple_domicile_fin_annee
      }
    }
  }
`;
