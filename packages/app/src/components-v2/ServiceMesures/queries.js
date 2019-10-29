import gql from "graphql-tag";

export const MESURE = gql`
  query mesure($id: Int!) {
    mesures(where: { id: { _eq: $id } }) {
      id
      antenne_id
    }
  }
`;

export const MESURES = gql`
  query mesures(
    $limit: Int
    $antenne: Int
    $type: String
    $status: String
    $searchText: String
    $offset: Int
  ) {
    mesures_aggregate(
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        type: { _eq: $type }
        antenne_id: { _eq: $antenne }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      limit: $limit
      order_by: { date_ouverture: desc }
      offset: $offset
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        type: { _eq: $type }
        antenne_id: { _eq: $antenne }
      }
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
