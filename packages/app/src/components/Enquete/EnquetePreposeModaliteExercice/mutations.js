import gql from "graphql-tag";

export const UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS = gql`
  mutation update_enquete_prepose_modalite_exercice(
    $id: Int!
    $actions_information_tuteurs_familiaux: Boolean!
    $data: jsonb!
  ) {
    update_enquete_reponses_modalites_exercice_by_pk(
      pk_columns: { id: $id }
      _set: {
        actions_information_tuteurs_familiaux: $actions_information_tuteurs_familiaux
        nombre_lits_journee_hospitalisation: $data
      }
    ) {
      id
      nombre_lits_journee_hospitalisation
    }
  }
`;

export const UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_INFORMATIONS = gql`
  mutation update_enquete_prepose_modalite_exercice(
    $id: Int!
    $departement: String
    $activite_exercee_par: String
    $etablissements_type: String
    $personnalite_juridique_etablissement: String
    $raison_sociale: String
    $region: String
    $total_mesures_etablissements: Int
  ) {
    update_enquete_reponses_modalites_exercice_by_pk(
      pk_columns: { id: $id }
      _set: {
        departement: $departement
        activite_exercee_par: $activite_exercee_par
        etablissements_type: $etablissements_type
        personnalite_juridique_etablissement: $personnalite_juridique_etablissement
        raison_sociale: $raison_sociale
        region: $region
        total_mesures_etablissements: $total_mesures_etablissements
      }
    ) {
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
