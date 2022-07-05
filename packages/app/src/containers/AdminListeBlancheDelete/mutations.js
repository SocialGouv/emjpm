import gql from "graphql-tag";

export const DELETE_LISTE_BLANCHE = gql`
  mutation delete_liste_blanche($listeBlancheId: Int!) {
    delete_users(
      where: { mandataire: { liste_blanche_id: { _eq: $listeBlancheId } } }
    ) {
      affected_rows
    }
    delete_liste_blanche_by_pk(id: $listeBlancheId) {
      id
    }
  }
`;
