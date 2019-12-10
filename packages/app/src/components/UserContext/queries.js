import gql from "graphql-tag";

export const CURRENT_USER = gql`
  {
    currentUser @client {
      role
      serviceId
      id
      antenneId
    }
  }
`;

export const GET_SERVICE_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
      service_admins {
        user {
          prenom
          nom
          id
        }
        id
        service_id
        user_id
        service {
          mesures_in_progress
          mesures_awaiting
          dispo_max
          etablissement
        }
      }
      user_antennes {
        service_antenne {
          name
          mesures_max
          mesures_in_progress
          mesures_awaiting
          id
          contact_phone
          contact_lastname
          contact_firstname
          contact_email
          address_zip_code
          address_street
          address_city
        }
        user {
          prenom
          nom
        }
        id
        antenne_id
      }
    }
  }
`;

export const DIRECTION_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
    }
  }
`;

export const MAGISTRAT_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
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
        ti_id
        ti {
          id
          siret
          ville
          telephone
          etablissement
          email
          code_postal
        }
      }
    }
  }
`;

export const ADMIN_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
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
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
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
      }
    }
  }
`;
