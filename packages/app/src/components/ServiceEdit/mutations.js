import gql from "graphql-tag";

export const EDIT_ANTENNE = gql`
  mutation EditService(
    $adresse: String
    $code_postal: String
    $dispo_max: Int
    $email: String
    $information: String
    $etablissement: String
    $nom: String
    $prenom: String
    $service_id: Int
    $ville: String
    $telephone: String
  ) {
    __typename
    update_services(
      where: { id: { _eq: $service_id } }
      _set: {
        adresse: $adresse
        dispo_max: $dispo_max
        email: $email
        nom: $nom
        prenom: $prenom
        telephone: $telephone
        code_postal: $code_postal
        etablissement: $etablissement
        information: $information
        ville: $ville
      }
    ) {
      affected_rows
    }
  }
`;
