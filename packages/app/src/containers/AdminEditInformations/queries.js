import gql from "graphql-tag";

export const ADMIN = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
    }
  }
`;
