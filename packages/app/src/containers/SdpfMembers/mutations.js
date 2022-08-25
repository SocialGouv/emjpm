import gql from "graphql-tag";

export const DELETE_SERVICE_MEMBER = gql`
  mutation deleteServiceMember($id: Int!) {
    delete_sdpf_members(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const UPDATE_SERVICE_MEMBER_IS_ADMIN = gql`
  mutation updateServiceMemberIsAdmin($id: Int!, $is_admin: Boolean!) {
    update_sdpf_members(
      where: { id: { _eq: $id } }
      _set: { is_admin: $is_admin }
    ) {
      affected_rows
    }
  }
`;
