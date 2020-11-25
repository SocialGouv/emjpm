import gql from "graphql-tag";

export const LB_USER = gql`
  query adminUserMandataireLBUser($where: lb_users_bool_exp!) {
    lb_users(where: $where) {
      id
      email
      nom
      prenom
      lb_departements {
        id
        departement_financeur
        departement {
          id
          code
        }
      }
    }
  }
`;

export const USER = gql`
  query adminUserQuery($userId: Int!) {
    users_by_pk(id: $userId) {
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
      }
    }
  }
`;
