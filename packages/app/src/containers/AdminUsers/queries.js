import gql from "graphql-tag";

export const USERS = gql`
  query searchUsers($limit: Int, $search: String, $offset: Int, $type: String) {
    search_users_aggregate(
      args: { search: $search }
      where: { type: { _eq: $type } }
    ) {
      aggregate {
        count
      }
    }
    search_users(
      limit: $limit
      order_by: { active: asc, id: desc }
      offset: $offset
      args: { search: $search }
      where: { type: { _eq: $type } }
    ) {
      id
      nom
      prenom
      type
      email
      active
      directions {
        id
        type
        departement {
          id
          nom
        }
        region {
          id
          nom
        }
      }
      mandataire {
        id
        lb_user_id
      }
    }
  }
`;
