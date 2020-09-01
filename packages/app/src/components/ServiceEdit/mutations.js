import gql from "graphql-tag";

export const EDIT_ANTENNE = gql`
  mutation update_service(
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
      returning {
        id
        siret
        adresse
        code_postal
        email
        competences
        created_at
        department_id
        dispo_max
        etablissement
        latitude
        longitude
        mesures_awaiting
        mesures_in_progress
        nom
        prenom
        siret
        telephone
        ville
      }
    }
  }
`;
