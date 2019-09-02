import gql from "graphql-tag";

export const GET_SERVICE_USERS = gql`
  {
    users {
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

export const GET_DIRECTION_USERS = gql`
  {
    users {
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
