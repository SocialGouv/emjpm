import gql from "graphql-tag";

export const USER_TOKEN = gql`
  query AccessToken {
    access_tokens {
      access_token
      editor_id
      editor_url
      id
      user_id
      editors {
        name
      }
    }
  }
`;
