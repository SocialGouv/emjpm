import gql from "graphql-tag";

export const INDIVIDUEL_EXERCICE = gql`
  query IndividuelExercice($mandataire_id: Int) {
    individuel_exercices(where: { mandataire_id: { _eq: $mandataire_id } }) {
      id
    }
  }
`;
