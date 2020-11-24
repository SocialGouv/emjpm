import gql from "graphql-tag";

export const DIRECTION = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      directions {
        id
        type
        region_id
        department_id
      }
    }
  }
`;
