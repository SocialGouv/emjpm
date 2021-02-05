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
    $departement_code: String!
    $lb_adresse: String! # $latitude: Float! # $longitude: Float!
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
        departement_code: $departement_code
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
        departement_code
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
  }
`;

export const ADD_SERVICE = gql`
  mutation addService(
    $etablissement: String!
    $lb_code_postal: String!
    $lb_ville: String!
    $email: String
    $telephone: String
    $departement_code: String!
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
        departement_code: $departement_code
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
