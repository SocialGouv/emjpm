import gql from "graphql-tag";

export const GET_SERVICE_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      email
      created_at
      cabinet
      last_login
      nom
      prenom
      type
      service_members {
        user {
          id
          prenom
          nom
        }
        id
        service_id
        service {
          service_antenne {
            id
            name
          }
        }
      }
    }
  }
`;

export const DIRECTION_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
    }
  }
`;

export const MAGISTRAT_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      magistrat {
        id
        ti_id
      }
    }
  }
`;

export const CURRENT_USER = gql`
  {
    currentId
  }
`;
