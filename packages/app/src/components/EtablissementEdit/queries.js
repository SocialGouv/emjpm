import gql from "graphql-tag";

export const ETABLISSEMENT = gql`
  query etablissement($id: Int!) {
    departements {
      id
      code
    }
    etablissements_by_pk(id: $id) {
      id
      nom
      ville
      code_postal
      departement {
        id
        code
        nom
      }
      adresse
      fax
      id_finess
      latitude
      longitude
      tel
    }
  }
`;
