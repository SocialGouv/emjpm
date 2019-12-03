import gql from "graphql-tag";

export const DEPARTEMENTS = gql`
  {
    departements {
      id
      code
      nom
    }
  }
`;

export const MESURE = gql`
  query mesure($id: Int!) {
    mesures(where: { id: { _eq: $id } }) {
      id
      service_id
      antenne_id
    }
  }
`;

export const SERVICE_TRIBUNAL = gql`
  query ServiceTribunal($serviceId: Int!) {
    service_tis(where: { service_id: { _eq: $serviceId } }) {
      ti {
        etablissement
        id
      }
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
      order_by: { created_at: desc_nulls_last }
      offset: $offset
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        type: { _eq: $type }
        antenne_id: { _eq: $antenne }
      }
    ) {
      antenne_id
      service_id
      id
      cabinet
      civilite
      code_postal
      judgment_date
      is_urgent
      departement {
        nom
        region {
          nom
        }
      }
      ti {
        id
        etablissement
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
