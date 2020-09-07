import gql from "graphql-tag";

export const CREATE_ETABLISSEMENT = gql`
  mutation create_etablissement(
    $adresse: String!
    $code_postal: String!
    $departement_id: Int
    $fax: String
    $id_finess: String
    $latitude: Float
    $longitude: Float
    $nom: String!
    $tel: String
    $ville: String!
  ) {
    insert_etablissements_one(
      object: {
        adresse: $adresse
        code_postal: $code_postal
        departement_id: $departement_id
        fax: $fax
        id_finess: $id_finess
        latitude: $latitude
        longitude: $longitude
        nom: $nom
        tel: $tel
        ville: $ville
      }
    ) {
      id
      id_finess
      adresse
      ville
      latitude
      longitude
      departement_id
      nom
      fax
      code_postal
      tel
    }
  }
`;

export const UPDATE_ETABLISSEMENT = gql`
  mutation update_etablissement($id: Int!, $data: etablissements_set_input = {}) {
    update_etablissements_by_pk(pk_columns: { id: $id }, _set: $data) {
      id
      id_finess
      adresse
      ville
      latitude
      longitude
      departement_id
      nom
      fax
      code_postal
      tel
    }
  }
`;
