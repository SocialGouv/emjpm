import gql from "graphql-tag";

export const CURRENT_USER = gql`
  {
    currentUser @client {
      id
      realUserId
    }
  }
`;
