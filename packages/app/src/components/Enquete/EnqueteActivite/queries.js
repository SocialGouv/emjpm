import gql from "graphql-tag";

export const ENQUETE_CURATELLE_SIMPLE = gql`
  query enquetes($id: Int!) {
    enquete_reponses(where: { id: { _eq: $id } }) {
      id
      activite_curatelle_simple_domicile_debut_annee
      activite_curatelle_simple_domicile_fin_annee
      activite_curatelle_simple_etablissement_debut_annee
      activite_curatelle_simple_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_CURATELLE_RENFORCEE = gql`
  query enquetes($id: Int!) {
    enquete_reponses(where: { id: { _eq: $id } }) {
      id
      activite_curatelle_renforcee_domicile_debut_annee
      activite_curatelle_renforcee_domicile_fin_annee
      activite_curatelle_renforcee_etablissement_debut_annee
      activite_curatelle_renforcee_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_CURATELLE_PERSONNE = gql`
  query enquete_curatelle($id: Int!) {
    enquete_reponses(where: { id: { _eq: $id } }) {
      id
      activite_curatelle_personne_domicile_debut_annee
      activite_curatelle_personne_domicile_fin_annee
      activite_curatelle_personne_etablissement_debut_annee
      activite_curatelle_personne_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_TUTELLE = gql`
  query enquete_tutelle($id: Int!) {
    enquete_reponses(where: { id: { _eq: $id } }) {
      id
      activite_tutelle_domicile_debut_annee
      activite_tutelle_domicile_fin_annee
      activite_tutelle_etablissement_debut_annee
      activite_tutelle_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_REVISION_MESURES = gql`
  query enquete_tutelle($id: Int!) {
    enquete_reponses(where: { id: { _eq: $id } }) {
      id
      activite_revisions_main_levee
      activite_revisions_masp
      activite_revisions_reconduction
      activite_revisions_changement
      activite_revisions_autre
    }
  }
`;

export const ENQUETE_CURATELLE_BIENS = gql`
  query enquete_curatelle_biens($id: Int!) {
    enquete_reponses(where: { id: { _eq: $id } }) {
      id
      activite_curatelle_biens_domicile_debut_annee
      activite_curatelle_biens_domicile_fin_annee
      activite_curatelle_biens_etablissement_debut_annee
      activite_curatelle_biens_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE = gql`
  query enquete_accompagnement_judiciaire($id: Int!) {
    enquete_reponses(where: { id: { _eq: $id } }) {
      id
      activite_accompagnement_judiciaire_domicile_debut_annee
      activite_accompagnement_judiciaire_domicile_fin_annee
      activite_accompagnement_judiciaire_etablissement_debut_annee
      activite_accompagnement_judiciaire_etablissement_fin_annee
    }
  }
`;
