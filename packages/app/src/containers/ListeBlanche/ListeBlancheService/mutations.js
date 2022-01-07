import gql from "graphql-tag";

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $liste_blanche_id: Int!
    $service_id: Int!
    $etablissement: String!
    $code_postal: String!
    $genre: String
    $nom: String
    $prenom: String
    $ville: String!
    $siret: String!
    $email: String
    $telephone: String
    $service_departements: [service_departements_insert_input!]!
    $departement_codes: [String!]!
    $adresse: String!
    $org_gestionnaire: Boolean!
    $org_nom: String
    $org_adresse: String
    $org_code_postal: String
    $org_ville: String
  ) {
    update_liste_blanche(
      where: { id: { _eq: $liste_blanche_id } }
      _set: {
        etablissement: $etablissement
        siret: $siret
        code_postal: $code_postal
        genre: $genre
        nom: $nom
        prenom: $prenom
        ville: $ville
        email: $email
        telephone: $telephone
        adresse: $adresse
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
        adresse
        ville
        code_postal
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
          { service_id: { _eq: $service_id } }
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
    $code_postal: String!
    $ville: String!
    $genre: String
    $nom: String
    $prenom: String
    $email: String
    $telephone: String
    $departements: [service_departements_insert_input!]!
    $adresse: String!
    $siret: String!
    $org_gestionnaire: Boolean!
    $org_nom: String
    $org_adresse: String
    $org_code_postal: String
    $org_ville: String
  ) {
    insert_liste_blanche(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        genre: $genre
        nom: $nom
        prenom: $prenom
        email: $email
        telephone: $telephone
        adresse: $adresse
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
        location_adresse
        latitude
        longitude
        siret
        org_gestionnaire
        org_nom
        org_adresse
        org_code_postal
        org_ville
        adresse
        ville
        code_postal
      }
    }
    insert_services(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        genre: $genre
        nom: $nom
        prenom: $prenom
        email: $email
        service_departements: { data: $departements }
        telephone: $telephone
        adresse: $adresse
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
        location_adresse
        latitude
        longitude
        siret
        org_gestionnaire
        org_nom
        org_adresse
        org_code_postal
        org_ville
        adresse
        ville
        code_postal
      }
    }
  }
`;
