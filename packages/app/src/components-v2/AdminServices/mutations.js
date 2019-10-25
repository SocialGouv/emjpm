import gql from "graphql-tag";

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: Int!
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $email: String
    $telephone: String
    $department_id: Int!
  ) {
    update_services(
      where: { id: { _eq: $id } }
      _set: {
        etablissement: $etablissement
        code_postal: $code_postal
        department_id: $department_id
        ville: $ville
        email: $email
        telephone: $telephone
      }
    ) {
      affected_rows
    }

    update_service_antenne(
      where: { service_id: { _eq: $id }, headquarters: { _eq: true } }
      _set: { name: $etablissement, address_city: $ville, address_zip_code: $code_postal }
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
  ) {
    insert_services(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        email: $email
        department_id: $department_id
        telephone: $telephone
        service_antennes: {
          data: {
            name: $etablissement
            address_city: $ville
            address_zip_code: $code_postal
            headquarters: true
          }
        }
      }
    ) {
      returning {
        id
        etablissement
        code_postal
        ville
        telephone
        email
      }
    }
  }
`;
