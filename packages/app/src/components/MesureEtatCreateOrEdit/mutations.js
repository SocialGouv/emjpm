import gql from "graphql-tag";

export const ADD_MESURE_ETAT = gql`
  mutation addMesureEtat(
    $date_changement_etat: date!
    $mesure_id: Int!
    $department_id: Int
    $nature_mesure: nature_mesure_type!
    $champ_mesure: champ_mesure_type
    $lieu_vie: lieu_vie_type!
    $type_etablissement: type_etablissement_type
    $code_postal: String
    $ville: String
    $latitude: Float
    $longitude: Float
    $pays: String!
  ) {
    update_mesures(
      where: { id: { _eq: $mesure_id } }
      _set: {
        latitude: $latitude
        longitude: $longitude
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        lieu_vie: $lieu_vie
        department_id: $department_id
        code_postal: $code_postal
        ville: $ville
        pays: $pays
      }
    ) {
      returning {
        id
      }
    }
    add_or_update: insert_mesure_etat(
      objects: {
        date_changement_etat: $date_changement_etat
        mesure_id: $mesure_id
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        lieu_vie: $lieu_vie
        type_etablissement: $type_etablissement
        code_postal: $code_postal
        ville: $ville
        pays: $pays
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const EDIT_MESURE_ETAT = gql`
  mutation editMesureEtat(
    $id: Int!
    $mesure_id: Int!
    $date_changement_etat: date!
    $department_id: Int
    $nature_mesure: nature_mesure_type!
    $champ_mesure: champ_mesure_type
    $lieu_vie: lieu_vie_type
    $type_etablissement: type_etablissement_type
    $code_postal: String
    $ville: String
    $latitude: Float
    $longitude: Float
    $pays: String!
  ) {
    update_mesures(
      where: { id: { _eq: $mesure_id } }
      _set: {
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        lieu_vie: $lieu_vie
        latitude: $latitude
        longitude: $longitude
        department_id: $department_id
        code_postal: $code_postal
        ville: $ville
        pays: $pays
      }
    ) {
      returning {
        id
      }
    }
    add_or_update: update_mesure_etat(
      where: { id: { _eq: $id } }
      _set: {
        date_changement_etat: $date_changement_etat
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        lieu_vie: $lieu_vie
        type_etablissement: $type_etablissement
        code_postal: $code_postal
        ville: $ville
        pays: $pays
      }
    ) {
      returning {
        id
      }
    }
  }
`;
