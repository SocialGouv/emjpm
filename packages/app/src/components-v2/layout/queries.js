import gql from "graphql-tag";

export const GET_USERS = gql`
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
