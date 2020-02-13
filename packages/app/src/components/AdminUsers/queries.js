import gql from "graphql-tag";

export const USERS = gql`
  query services($limit: Int, $searchText: String, $offset: Int) {
    users_aggregate(where: { nom: { _ilike: $searchText } }) {
      aggregate {
        count
      }
    }
    users(
      limit: $limit
      order_by: { active: asc, id: desc }
      offset: $offset
      where: { nom: { _ilike: $searchText } }
    ) {
      id
      nom
      prenom
      type
      email
      active
    }
  }
`;

export const USER = gql`
  query user($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      nom
      prenom
      type
      email
      active
      magistrat {
        id
        ti {
          id
          ville
        }
      }
      user_tis(order_by: { ti: { ville: asc } }) {
        id
        ti {
          id
          ville
        }
      }
      service_members {
        id
        service {
          id
          etablissement
        }
      }
    }
  }
`;
