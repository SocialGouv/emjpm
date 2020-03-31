import gql from "graphql-tag";

export const UPDATE_INDIVIDUEL_AGREMENT = gql`
  mutation UpdateIndividuelAgrement(
    $mandataire_id: Int!
    $debut_activite_avant_2009: Boolean!
    $annee_debut_activite: Int
    $annee_agrement: Int!
  ) {
    update_individuel_agrements(
      _set: {
        debut_activite_avant_2009: $debut_activite_avant_2009
        annee_debut_activite: $annee_debut_activite
        annee_agrement: $annee_agrement
      }
      where: { mandataire_id: { _eq: $mandataire_id } }
    ) {
      affected_rows
      returning {
        id
        debut_activite_avant_2009
        annee_debut_activite
        annee_agrement
      }
    }
  }
`;
