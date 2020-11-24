import gql from "graphql-tag";

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
        department_id
        type
      }
    }
  }
`;
