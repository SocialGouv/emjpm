import gql from "graphql-tag";

export const USERS = gql`
  query allUsers(
    $limit: Int
    $searchText: String
    $offset: Int
    $type: String
  ) {
    users_aggregate(
      where: {
        type: { _eq: $type }
        _or: [
          { email: { _ilike: $searchText } }
          { nom: { _ilike: $searchText } }
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
          { email: { _ilike: $searchText } }
          { nom: { _ilike: $searchText } }
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

export const USER = gql`
  query user($userId: Int!) {
    directionRoles: role(where: { name: { _like: "direction%" } }) {
      id
      name
    }
    departements {
      id
      code
      nom
    }
    regions {
      nom
      id
    }
    users_by_pk(id: $userId) {
      id
      user_roles {
        id
        role {
          id
          name
        }
      }
      directions {
        id
        region_id
        department_id
        type
      }
      id
      nom
      prenom
      type
      email
      active
      mandataire {
        id
        siret
        lb_user_id
        lb_user {
          id
          nom
          prenom
          email
          siret
        }
        mandataire_tis(order_by: { ti: { ville: asc } }) {
          id
          ti {
            id
            ville
          }
        }
      }
      magistrat {
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
