import gql from "graphql-tag";

export const LISTE_BLANCHE = gql`
  query adminUserMandataireLBUser($where: liste_blanche_bool_exp!) {
    liste_blanche(where: $where) {
      id
      email
      nom
      prenom
      mandataire_individuel_departements {
        id
        departement_financeur
        departement {
          id
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
        liste_blanche_id
        liste_blanche {
          id
          nom
          prenom
          email
          siret
        }
      }
      dpfi {
        id
        siret
        liste_blanche {
          id
          nom
          prenom
          email
          siret
        }
      }
      service_members {
        service {
          liste_blanche {
            id
            etablissement
          }
        }
      }
    }
  }
`;
