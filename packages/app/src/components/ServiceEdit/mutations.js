import gql from "graphql-tag";

export const EDIT_ANTENNE = gql`
  mutation EditService(
    $adresse: String
    $code_postal: String
    $dispo_max: Int
    $email: String
    $competences: String
    $nom: String
    $prenom: String
    $service_id: Int
    $ville: String
    $telephone: String
    $latitude: Float
    $longitude: Float
  ) {
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
        competences: $competences
        ville: $ville
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      affected_rows
    }
  }
`;
