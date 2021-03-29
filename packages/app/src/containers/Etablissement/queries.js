import gql from "graphql-tag";

export const ROUTINE_IMPORT_FINESS = gql`
  query routineImportFiness {
    routine_log(
      where: { _and: { type: { _eq: "import_finess" } } }
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

    config_finess_dataset_url: config_by_pk(key: "finess_dataset_url") {
      value
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
