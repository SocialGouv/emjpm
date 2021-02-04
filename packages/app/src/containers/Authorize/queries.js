import gql from "graphql-tag";

export const EDITOR = gql`
  query editor($id: Int!) {
    editor: editors_by_pk(id: $id) {
      id
      name
    }
    accessTokens: access_tokens(where: { editor_id: { _eq: $id } }) {
      id
      editor_id
    }
  }
`;
