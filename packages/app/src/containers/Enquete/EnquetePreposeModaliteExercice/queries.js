import gql from "graphql-tag";

export const ENQUETE_PREPOSE_INFORMATIONS = gql`
  query enquete_prepose_informations($id: Int!) {
    enquete_reponses_modalites_exercice_by_pk(id: $id) {
      actions_information_tuteurs_familiaux
      created_at
      departement
      activite_exercee_par
      etablissements_type
      id
      last_update
      nombre_lits_journee_hospitalisation
      personnalite_juridique_etablissement
      raison_sociale
      region
      total_mesures_etablissements
    }
  }
`;
