import gql from "graphql-tag";

export const LB_USERS = gql`
  query LB_USERS {
    lb_users {
      id
      nom
      prenom
      email
      user_id
      lb_departements {
        ti
        service
        prepose
        individuel
        departement {
          code
          nom
        }
      }
    }
  }
`;
