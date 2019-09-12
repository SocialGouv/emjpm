import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  {
    currentUser @client {
      user_antennes {
        service_antenne {
          id
          name
        }
      }
    }
  }
`;
