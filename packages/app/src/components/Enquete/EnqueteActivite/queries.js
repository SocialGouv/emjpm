import gql from "graphql-tag";

export const ENQUETE_CURATELLE_SIMPLE = gql`
  query enquete_reponses_activite_curatelle_simple($id: Int!) {
    enquete_reponses_activite_by_pk(id: $id) {
      curatelle_simple_domicile_debut_annee
      curatelle_simple_domicile_fin_annee
      curatelle_simple_etablissement_debut_annee
      curatelle_simple_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_CURATELLE_RENFORCEE = gql`
  query enquete_reponses_activite_curatelle_renforcee($id: Int!) {
    enquete_reponses_activite_by_pk(id: $id) {
      curatelle_renforcee_domicile_debut_annee
      curatelle_renforcee_domicile_fin_annee
      curatelle_renforcee_etablissement_debut_annee
      curatelle_renforcee_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_CURATELLE_PERSONNE = gql`
  query enquete_reponses_activite_curatelle_personne($id: Int!) {
    enquete_reponses_activite_by_pk(id: $id) {
      curatelle_personne_domicile_debut_annee
      curatelle_personne_domicile_fin_annee
      curatelle_personne_etablissement_debut_annee
      curatelle_personne_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_TUTELLE = gql`
  query enquete_reponses_activite_tutelle($id: Int!) {
    enquete_reponses_activite_by_pk(id: $id) {
      tutelle_domicile_debut_annee
      tutelle_domicile_fin_annee
      tutelle_etablissement_debut_annee
      tutelle_etablissement_fin_annee
    }
  }
`;

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

export const ENQUETE_CURATELLE_BIENS = gql`
  query enquetes_reponses_activite_curatelle_biens($id: Int!) {
    enquete_reponses_activite_by_pk(id: $id) {
      curatelle_biens_domicile_debut_annee
      curatelle_biens_domicile_fin_annee
      curatelle_biens_etablissement_debut_annee
      curatelle_biens_etablissement_fin_annee
    }
  }
`;

export const ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE = gql`
  query enquete_reponses_activite_accompagnement_judiciaire($id: Int!) {
    enquete_reponses_activite_by_pk(id: $id) {
      accompagnement_judiciaire_domicile_debut_annee
      accompagnement_judiciaire_domicile_fin_annee
      accompagnement_judiciaire_etablissement_debut_annee
      accompagnement_judiciaire_etablissement_fin_annee
    }
  }
`;
