import gql from "graphql-tag";

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
