import gql from "graphql-tag";

export const MANDATAIRE_AGREMENT = gql`
  query MandataireAgrement($mandataire_id: Int) {
    individuel_agrements(where: { mandataire_id: { _eq: $mandataire_id } }) {
      id
      debut_activite_avant_2009
      annee_debut_activite
      annee_agrement
    }
  }
`;
