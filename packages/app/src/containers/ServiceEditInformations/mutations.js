import gql from "graphql-tag";

export const EDIT_SERVICE = gql`
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
    $service_tis: [service_tis_insert_input!]!
    $dispo_departements: [dispo_departements_insert_input!]!
    $departement_codes: [String!]!
  ) {
    delete_dispo_departements(
      where: { departement_code: { _nin: $departement_codes } }
    ) {
      affected_rows
    }
    insert_dispo_departements(
      objects: $dispo_departements
      on_conflict: {
        constraint: dispo_departements_service_id_departement_code_key
        update_columns: [dispo]
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
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
