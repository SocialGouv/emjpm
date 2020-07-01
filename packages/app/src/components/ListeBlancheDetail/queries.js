import gql from "graphql-tag";

export const LB_USER = gql`
  query listeBlancheUser($id: Int!) {
    lb_users(where: { id: { _eq: $id } }) {
      id
      nom
      prenom
      email
      siret
      type
      mandataire {
        id
        user {
          id
          nom
          prenom
        }
      }
      lb_departements {
        id
        departement_financeur
        ti
        service
        prepose
        individuel
        departement {
          id
          code
          nom
        }
      }
    }
  }
`;
