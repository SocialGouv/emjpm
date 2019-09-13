import gql from "graphql-tag";

export const GET_SERVICE_USERS = gql`
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
      username
      service_admins {
        user {
          prenom
          nom
        }
        id
        service_id
      }
      user_antennes {
        service_antenne {
          id
          name
        }
        user {
          prenom
          nom
        }
        id
        antenne_id
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
      username
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
      username
      magistrat {
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
