import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($limit: Int, $antenne: Int, $type: String, $status: String, $offset: Int) {
    mesures_aggregate {
      aggregate {
        count
      }
    }
    mesures(
      limit: $limit
      offset: $offset
      where: { status: { _eq: $status }, type: { _eq: $type }, antenne_id: { _eq: $antenne } }
    ) {
      antenne_id
      id
      cabinet
      civilite
      code_postal
      departement {
        nom
        region {
          nom
        }
      }
      status
      type
      ville
      residence
      numero_rg
      numero_dossier
      etablissement
      annee
      date_ouverture
    }
  }
`;
