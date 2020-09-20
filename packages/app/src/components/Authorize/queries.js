import gql from "graphql-tag";

export const EDITOR = gql`
  query editor($id: Int!) {
    editors_by_pk(id: $id) {
      name
    }
  }
`;
