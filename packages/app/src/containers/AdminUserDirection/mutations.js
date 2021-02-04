import gql from "graphql-tag";

export const CHANGE_DIRECTION_AGREMENT = gql`
  mutation change_direction_roles(
    $user_id: Int!
    $direction_id: Int!
    $direction_role_id: Int!
    $new_direction_role_id: Int!
    $type: String!
    $department_id: Int
    $region_id: Int
  ) {
    delete_user_role(where: { user_id: { _eq: $user_id } }) {
      affected_rows
    }
    insert_user_role(
      objects: [
        { role_id: $direction_role_id, user_id: $user_id }
        { role_id: $new_direction_role_id, user_id: $user_id }
      ]
    ) {
      affected_rows
    }
    update_direction_by_pk(
      pk_columns: { id: $direction_id }
      _set: {
        department_id: $department_id
        region_id: $region_id
        type: $type
      }
    ) {
      id
      department_id
      region_id
      type
    }
  }
`;
