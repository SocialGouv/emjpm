import gql from "graphql-tag";

export const ACTIVATE_USER = gql`
  mutation activateUser($id: Int!, $active: Boolean!) {
    update_users(where: { id: { _eq: $id } }, _set: { active: $active }) {
      returning {
        id
        active
      }
    }
  }
`;
