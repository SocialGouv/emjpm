import gql from "graphql-tag";

export const ROUTINE_IMPORT_FINESS = gql`
  query running_routine($expired: timestamptz!) {
    running: routine_log(
      where: {
        _and: {
          type: { _eq: "import_finess" }
          end_date: { _is_null: true }
          start_date: { _gt: $expired }
        }
      }
      order_by: { start_date: desc }
      limit: 1
    ) {
      id
      start_date
      end_date
    }
    last: routine_log(
      where: {
        _and: {
          type: { _eq: "import_finess" }
          end_date: { _is_null: false }
          result: { _eq: "success" }
        }
      }
      order_by: { end_date: desc }
      limit: 1
    ) {
      end_date
    }
  }
`;

export const ETABLISSEMENT = gql`
  query etablissement($id: Int!) {
    etablissements_by_pk(id: $id) {
      id
      nofinesset
      nofinessej
      rslongue
      complrs
      compldistrib
      numvoie
      typvoie
      voie
      compvoie
      lieuditbp
      commune
      libdepartement
      ligneacheminement
      telephone
      telecopie
      categetab
      libcategetab
      categagretab
      libcategagretab
      siret
      codeape
      codemft
      libmft
      codesph
      libsph
      dateouv
      dateautor
      numuai
      coordxet
      coordyet
      sourcecoordet
      departement {
        id
        nom
      }
    }
  }
`;
