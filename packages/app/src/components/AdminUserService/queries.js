import gql from "graphql-tag";

export const USER_SERVICE = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      service_members {
        id
        service {
          id
          etablissement
        }
      }
    }
  }
`;
