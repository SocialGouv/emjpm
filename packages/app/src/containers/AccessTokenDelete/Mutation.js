import gql from "graphql-tag";

export const REMOVE_ACCESS_TOKEN = gql`
  mutation RemoveAccessToken($id: Int) {
    delete_access_tokens(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
