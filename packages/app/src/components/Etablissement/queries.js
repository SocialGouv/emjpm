import gql from "graphql-tag";

export const ETABLISSEMENT = gql`
  query etablissement($id: Int!) {
    etablissements_by_pk(id: $id) {
      id
      nofinesset
      nofinessej
      rs
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
        code
        nom
      }
    }
  }
`;
