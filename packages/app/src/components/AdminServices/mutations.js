import gql from "graphql-tag";

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: Int!
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $siret: String!
    $email: String
    $telephone: String
    $department_id: Int!
    $adresse: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    update_services(
      where: { id: { _eq: $id } }
      _set: {
        etablissement: $etablissement
        siret: $siret
        code_postal: $code_postal
        department_id: $department_id
        ville: $ville
        email: $email
        telephone: $telephone
        adresse: $adresse
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation addService(
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $email: String
    $telephone: String
    $department_id: Int!
    $adresse: String!
    $latitude: Float!
    $longitude: Float!
    $siret: String!
  ) {
    insert_services(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        email: $email
        department_id: $department_id
        telephone: $telephone
        adresse: $adresse
        latitude: $latitude
        longitude: $longitude
        siret: $siret
        service_personnels: { data: [{}] }
      }
    ) {
      returning {
        id
        etablissement
        code_postal
        ville
        telephone
        email
        adresse
        latitude
        longitude
        siret
      }
    }
  }
`;

export const ADD_SERVICE_TIS = gql`
  mutation admin_add_service_tis($serviceId: Int!, $tiId: Int!) {
    insert_service_tis(objects: { ti_id: $tiId, service_id: $serviceId }) {
      affected_rows
      returning {
        id
        ti_id
        service_id
      }
    }
  }
`;

export const DELETE_SERVICE_TIS = gql`
  mutation admin_delete_service_tis($id: Int!) {
    delete_service_tis(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const DELETE_MESURES = gql`
  mutation admin_delete_service_mesures($ids: [Int!]) {
    delete_mesures(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }
`;

export const RECALCULATE_SERVICE_MESURES = gql`
  mutation update_service_mesures($serviceId: Int!) {
    recalculateServiceMesuresCount(serviceId: $serviceId) {
      success
      updatedRows
    }
  }
`;
