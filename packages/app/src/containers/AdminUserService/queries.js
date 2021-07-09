import gql from "graphql-tag";

export const USER_SERVICE = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      # TODO(UP TO MULTIPLE SERVICES)
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
