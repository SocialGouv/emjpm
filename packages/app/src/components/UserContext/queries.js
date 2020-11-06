import gql from "graphql-tag";

export const CURRENT_USER = gql`
  {
    currentUser @client {
      role
      serviceId
      id
    }
  }
`;

export const GET_SERVICE_USERS = gql`
  query CURRENT_USER_QUERY($userId: Int!, $endDate: timestamptz) {
    enquetes(
      where: {
        status: { _eq: "created" }
        _or: [{ date_fin: { _lt: $endDate } }, { date_fin: { _is_null: true } }]
      }
    ) {
      annee
      status
      date_fin
      id
    }
    users_by_pk(id: $userId) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
      service_members {
        id
        service_id
        user_id
        is_admin
        user {
          email
          prenom
          nom
          id
        }
        service {
          id
          mesures_in_progress
          mesures_awaiting
          dispo_max
          etablissement
          longitude
          latitude
          departement {
            id
            code
          }
          service_antennes(order_by: { name: asc }) {
            name
            mesures_max
            mesures_in_progress
            mesures_awaiting
            id
            contact_phone
            contact_lastname
            contact_firstname
            contact_email
            code_postal
            ville
            adresse
            longitude
            latitude
          }
        }
      }
    }
  }
`;

export const DIRECTION_USERS = gql`
  query CURRENT_USER_QUERY($userId: Int!) {
    users_by_pk(id: $userId) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
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
      user_roles {
        role {
          name
        }
      }
    }
  }
`;

export const MAGISTRAT_USERS = gql`
  query CURRENT_USER_QUERY($userId: Int!) {
    users_by_pk(id: $userId) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
      magistrat {
        id
        ti_id
        ti {
          id
          siret
          ville
          telephone
          etablissement
          email
          code_postal
          adresse
          latitude
          longitude
        }
      }
    }
  }
`;

export const ADMIN_USERS = gql`
  query CURRENT_USER_QUERY($userId: Int!) {
    users_by_pk(id: $userId) {
      email
      created_at
      id
      last_login
      nom
      prenom
      type
      username
    }
  }
`;

export const MANDATAIRE_USERS = gql`
  query CURRENT_USER_QUERY($userId: Int!, $endDate: timestamptz) {
    enquetes(
      where: {
        status: { _eq: "created" }
        _or: [{ date_fin: { _lt: $endDate } }, { date_fin: { _is_null: true } }]
      }
    ) {
      annee
      status
      date_fin
      id
    }
    users_by_pk(id: $userId) {
      email
      created_at
      id
      last_login
      nom
      prenom
      type
      username
      cabinet
      mandataire {
        id
        dispo_max
        mesures_en_cours
        mesures_en_attente
        longitude
        latitude
        telephone
        telephone_portable
        siret
        adresse
        ville
        code_postal
        competences
        mandataire_tis {
          id
          ti {
            id
            etablissement
          }
        }
        lb_user {
          id
          siret
          adresse1
          adresse2
          code_postal
          ville
          lb_user_etablissements {
            etablissement_rattachement
            etablissement {
              id
              rslongue
              departement {
                id
                id_region
                code
              }
            }
          }
          lb_departements {
            id
            departement_financeur
            departement {
              id
              nom
              code
            }
          }
        }
      }
    }
  }
`;
