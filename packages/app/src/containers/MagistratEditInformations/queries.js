import gql from "graphql-tag";

export const MAGISTRAT = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      genre
      magistrat {
        id
        ti_id
        share_email
      }
      cabinet
    }
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
      ville
    }
  }
`;
