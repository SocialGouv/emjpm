import gql from "graphql-tag";

export const MAGISTRAT = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      magistrat {
        id
        ti_id
      }
    }
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
      ville
    }
  }
`;
