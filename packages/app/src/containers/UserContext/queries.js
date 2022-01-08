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
      where: { status: { _eq: "created" }, date_fin: { _gt: $endDate } }
    ) {
      annee
      status
      date_fin
      id
    }
    statistics: mandataire_statistics(userId: $userId) {
      natureStatistics
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
          suspend_activity
          suspend_activity_reason
          editor_locked_mesures
          editor {
            name
          }
          departements {
            id
          }
          service_tis {
            id
            ti {
              id
              etablissement
            }
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
      magistrat {
        id
        ti_id
        share_email
        ti {
          id
          siret
          ville
          telephone
          etablissement
          email
          code_postal
          departement_code
          adresse
          latitude
          longitude
        }
      }
    }
  }
`;

export const GREFFIER_USERS = gql`
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
      greffier {
        id
        ti_id
        share_email
        ti {
          id
          siret
          ville
          telephone
          etablissement
          email
          code_postal
          departement_code
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
    }
  }
`;

export const MANDATAIRE_USERS = gql`
  query CURRENT_USER_QUERY($userId: Int!, $endDate: timestamptz!) {
    enquetes(
      where: { status: { _eq: "created" }, date_fin: { _gt: $endDate } }
    ) {
      annee
      status
      date_fin
      id
    }
    statistics: mandataire_statistics(userId: $userId) {
      natureStatistics
    }
    users_by_pk(id: $userId) {
      email
      created_at
      id
      last_login
      nom
      prenom
      type
      cabinet
      mandataire {
        id
        dispo_max
        suspend_activity
        suspend_activity_reason
        mesures_en_cours
        mesures_en_attente
        longitude
        latitude
        telephone
        telephone_portable
        siret
        adresse
        competences
        sync_ocmi_enable
        editor_locked_mesures
        editor {
          name
        }
        mandataire_tis {
          id
          ti {
            id
            etablissement
          }
        }
        liste_blanche {
          id
          siret
          adresse
          adresse_complement
          code_postal
          ville
          mandataire_prepose_etablissements {
            etablissement_rattachement
            etablissement {
              id
              rslongue
              departement {
                id
                id_region
              }
            }
          }
          mandataire_individuel_departements {
            id
            departement_code
            departement_financeur
            departement {
              id
              nom
            }
          }
        }
      }
    }
  }
`;
