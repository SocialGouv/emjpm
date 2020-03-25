import gql from "graphql-tag";

export const INDIVIDUEL_EXERCICE = gql`
  query IndividuelExercice($mandataire_id: Int) {
    individuel_exercices(where: { mandataire_id: { _eq: $mandataire_id } }) {
      id
      estimation_etp
      secretaire_specialise
      secretaire_specialise_etp
      cumul_prepose
      cumul_prepose_etp
      cumul_delegue_service
      cumul_delegue_service_etp
    }
  }
`;
