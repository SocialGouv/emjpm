import gql from "graphql-tag";

export const LB_USERS = gql`
  query listeBlancheUsers($limit: Int, $offset: Int) {
    lb_users_aggregate {
      aggregate {
        count
      }
    }
    lb_users(limit: $limit, offset: $offset) {
      id
      nom
      prenom
      email
      type
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
