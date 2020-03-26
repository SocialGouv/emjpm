import gql from "graphql-tag";

export const UPDATE_INDIVIDUEL_EXERCICE = gql`
  mutation UpdateIndividuelExercice(
    $mandataire_id: Int!
    $estimation_etp: String!
    $secretaire_specialise: Boolean!
    $secretaire_specialise_etp: String
    $cumul_prepose: Boolean!
    $cumul_prepose_etp: String
    $cumul_delegue_service: Boolean!
    $cumul_delegue_service_etp: String
  ) {
    update_individuel_exercices(
      _set: {
        estimation_etp: $estimation_etp
        secretaire_specialise: $secretaire_specialise
        secretaire_specialise_etp: $secretaire_specialise_etp
        cumul_prepose: $cumul_prepose
        cumul_prepose_etp: $cumul_prepose_etp
        cumul_delegue_service: $cumul_delegue_service
        cumul_delegue_service_etp: $cumul_delegue_service_etp
      }
      where: { mandataire_id: { _eq: $mandataire_id } }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;
