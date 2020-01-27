import gql from "graphql-tag";

export const ADD_EDITOR = gql`
  mutation addEditor($name: String!, $api_token: String!) {
    insert_editors(objects: { name: $name, api_token: $api_token }) {
      returning {
        name
        api_token
      }
    }
  }
`;
