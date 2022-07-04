import gql from "graphql-tag";

export const UPDATE_SDPF = gql`
  mutation UpdateService(
    $etablissement: String!
    $code_postal: String!
    $genre: String
    $nom: String
    $prenom: String
    $ville: String!
    $siret: String!
    $originalSiret: String!
    $email: String
    $telephone: String
    $adresse: String!
    $org_gestionnaire: Boolean!
    $org_nom: String
    $org_adresse: String
    $org_code_postal: String
    $org_ville: String
  ) {
    update_liste_blanche(
      where: { siret: { _eq: $originalSiret } }
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
        email
        competences
        created_at
        etablissement
        nom
        prenom
        siret
        telephone
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
    update_sdpf(
      where: { siret: { _eq: $originalSiret } }
      _set: { siret: $siret }
    ) {
      affected_rows
    }
  }
`;

export const ADD_SDPF = gql`
  mutation addSdpf(
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $genre: String
    $nom: String
    $prenom: String
    $email: String
    $telephone: String
    $departement: String!
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
        type: "sdpf"
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
        telephone
        email
        adresse
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
    insert_sdpf(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        genre: $genre
        nom: $nom
        prenom: $prenom
        email: $email
        departement: $departement
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
      }
    }
  }
`;
