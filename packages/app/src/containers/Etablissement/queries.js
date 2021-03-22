import gql from "graphql-tag";

export const RUNNING_PROCESSUS_STATE = gql`
  query processus_states($now: timestamptz!) {
    processus_states(
      where: {
        _and: {
          type: { _eq: "import_finess" }
          end_date: { _is_null: true }
          expire_date: { _gt: $now }
        }
      }
      limit: 1
    ) {
      id
      start_date
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
