import gql from "graphql-tag";

export const DELETE_LB_USER = gql`
  mutation delete_lb_user($lbUserId: Int!) {
    delete_users(where: { mandataire: { lb_user_id: { _eq: $lbUserId } } }) {
      affected_rows
    }
    delete_lb_users_by_pk(id: $lbUserId) {
      id
    }
  }
`;
