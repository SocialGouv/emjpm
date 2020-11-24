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
