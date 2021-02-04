import gql from "graphql-tag";

export const USER = gql`
  query user($userId: Int!) {
    directionRoles: role(where: { name: { _like: "direction%" } }) {
      id
      name
    }
    departements {
      id
      nom
    }
    regions {
      nom
      id
    }
    users_by_pk(id: $userId) {
      id
      nom
      prenom
      type
      email
      active
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
        departement_code
        type
      }
    }
  }
`;
