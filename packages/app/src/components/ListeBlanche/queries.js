import gql from "graphql-tag";

export const LB_USER = gql`
  query listeBlancheUser($id: Int!) {
    lb_users_by_pk(id: $id) {
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
      lb_user_etablissements {
        id
        etablissement {
          id
          nom
        }
        lb_user_id
        etablissement_rattachement
      }
      lb_departements {
        id
        departement_id
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

export const LB_SERVICES = gql`
  query liste_blanche_services($limit: Int, $offset: Int, $filters: services_bool_exp = {}) {
    services_aggregate(where: $filters) {
      aggregate {
        count
      }
    }
    services(
      limit: $limit
      offset: $offset
      where: $filters
      order_by: { etablissement: asc_nulls_last }
    ) {
      id
      adresse
      siret
      etablissement
      code_postal
      created_at
      departement {
        id
        nom
      }
      nom
      telephone
    }
  }
`;

export const LB_USERS = gql`
  query liste_blanche_users($limit: Int, $offset: Int, $filters: lb_users_bool_exp = {}) {
    lb_users_aggregate(where: $filters) {
      aggregate {
        count
      }
    }
    lb_users(limit: $limit, offset: $offset, where: $filters, order_by: { nom: asc_nulls_last }) {
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
      lb_user_etablissements {
        etablissement {
          nom
          departement {
            id
            nom
            code
          }
        }
        etablissement_rattachement
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
