import gql from "graphql-tag";

export const UPDATE_INDIVIDUEL_EXERCICE = gql`
  mutation UpdateIndividuelExercice(
    $mandataire_id: Int!
    $estimation_etp: String!
    $secretariat_specialise: Boolean!
    $secretariat_specialise_etp: Float
    $cumul_prepose: Boolean!
    $cumul_prepose_etp: String
    $cumul_delegue_service: Boolean!
    $cumul_delegue_service_etp: String
  ) {
    update_individuel_exercices(
      _set: {
        estimation_etp: $estimation_etp
        secretariat_specialise: $secretariat_specialise
        secretariat_specialise_etp: $secretariat_specialise_etp
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
        estimation_etp
        secretariat_specialise
        secretariat_specialise_etp
        cumul_prepose
        cumul_prepose_etp
        cumul_delegue_service
        cumul_delegue_service_etp
      }
    }
  }
`;
