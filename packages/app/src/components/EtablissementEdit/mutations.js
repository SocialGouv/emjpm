import gql from "graphql-tag";

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
    }
  }
`;
