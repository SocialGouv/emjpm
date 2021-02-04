import gql from "graphql-tag";

export const USER_TOKEN = gql`
  query AccessToken($userId: Int) {
    access_tokens(where: { user_id: { _eq: $userId } }) {
      access_token
      refresh_token
      editor_id
      editor_url
      id
      user_id
      editors {
        id
        name
      }
    }
  }
`;
