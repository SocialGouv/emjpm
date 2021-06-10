import gql from "graphql-tag";

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: Int!
    $etablissement: String!
    $lb_code_postal: String!
    $lb_ville: String!
    $siret: String!
    $email: String
    $telephone: String
    $service_departements: [service_departements_insert_input!]!
    $departement_codes: [String!]!
    $lb_adresse: String!
    $org_gestionnaire: Boolean!
    $org_nom: String
    $org_adresse: String
    $org_code_postal: String
    $org_ville: String
  ) {
    update_services(
      where: { id: { _eq: $id } }
      _set: {
        etablissement: $etablissement
        siret: $siret
        lb_code_postal: $lb_code_postal
        lb_ville: $lb_ville
        email: $email
        telephone: $telephone
        lb_adresse: $lb_adresse
        org_gestionnaire: $org_gestionnaire
        org_nom: $org_nom
        org_adresse: $org_adresse
        org_code_postal: $org_code_postal
        org_ville: $org_ville
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
        org_gestionnaire
        org_nom
        org_adresse
        org_code_postal
        org_ville
        lb_adresse
        lb_ville
        lb_code_postal
      }
    }
    insert_service_departements(
      objects: $service_departements
      on_conflict: {
        constraint: service_departements_service_id_departement_code_key
        update_columns: []
      }
    ) {
      returning {
        id
      }
    }
    delete_service_departements(
      where: {
        _and: [
          { service_id: { _eq: $id } }
          { departement_code: { _nin: $departement_codes } }
        ]
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation addService(
    $etablissement: String!
    $lb_code_postal: String!
    $lb_ville: String!
    $email: String
    $telephone: String
    $departements: [service_departements_insert_input!]!
    $lb_adresse: String!
    $siret: String!
    $org_gestionnaire: Boolean!
    $org_nom: String
    $org_adresse: String
    $org_code_postal: String
    $org_ville: String
  ) {
    insert_services(
      objects: {
        etablissement: $etablissement
        lb_code_postal: $lb_code_postal
        lb_ville: $lb_ville
        email: $email
        service_departements: { data: $departements }
        telephone: $telephone
        lb_adresse: $lb_adresse
        siret: $siret
        org_gestionnaire: $org_gestionnaire
        org_nom: $org_nom
        org_adresse: $org_adresse
        org_code_postal: $org_code_postal
        org_ville: $org_ville
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
        org_gestionnaire
        org_nom
        org_adresse
        org_code_postal
        org_ville
        lb_adresse
        lb_ville
        lb_code_postal
      }
    }
  }
`;
