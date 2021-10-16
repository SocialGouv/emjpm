import gql from "graphql-tag";

export const EDIT_SERVICE = gql`
  mutation update_service(
    $adresse: String
    $code_postal: String
    $dispo_max: Int
    $suspend_activity: Boolean
    $suspend_activity_reason: String
    $email: String
    $competences: String
    $nom: String
    $prenom: String
    $service_id: Int
    $ville: String
    $telephone: String
    $latitude: Float
    $longitude: Float
    $service_tis: [service_tis_insert_input!]!
  ) {
    delete_service_tis(where: { service_id: { _eq: $service_id } }) {
      affected_rows
    }
    insert_service_tis(objects: $service_tis) {
      affected_rows
      returning {
        id
        ti_id
        service_id
      }
    }
    update_services(
      where: { id: { _eq: $service_id } }
      _set: {
        adresse: $adresse
        dispo_max: $dispo_max
        suspend_activity: $suspend_activity
        suspend_activity_reason: $suspend_activity_reason
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
        dispo_max
        suspend_activity
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
