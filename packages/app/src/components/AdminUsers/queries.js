import gql from "graphql-tag";

export const USERS = gql`
  query allUsers(
    $limit: Int
    $searchText: String
    $searchId: Int
    $offset: Int
    $type: String
  ) {
    users_aggregate(
      where: {
        type: { _eq: $type }
        _or: [
          { id: { _eq: $searchId } }
          { email: { _ilike: $searchText } }
          { nom: { _ilike: $searchText } }
          { prenom: { _ilike: $searchText } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    users(
      limit: $limit
      order_by: { active: asc, id: desc }
      offset: $offset
      where: {
        type: { _eq: $type }
        _or: [
          { id: { _eq: $searchId } }
          { email: { _ilike: $searchText } }
          { nom: { _ilike: $searchText } }
          { prenom: { _ilike: $searchText } }
        ]
      }
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
