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

export const SERVICE = gql`
  query service($id: Int) {
    services(where: { id: { _eq: $id } }) {
      id
      mesures_awaiting
      mesures_in_progress
      service_antennes {
        id
        mesures_awaiting
        mesures_in_progress
      }
    }
  }
`;

export const MESURES = gql`
  query mesures(
    $limit: Int
    $antenne: Int
    $natureMesure: nature_mesure_type
    $status: mesure_status_type
    $searchText: String
    $offset: Int
  ) {
    mesures_aggregate(
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        nature_mesure: { _eq: $natureMesure }
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
        nature_mesure: { _eq: $natureMesure }
        antenne_id: { _eq: $antenne }
      }
    ) {
      antenne_id
      service_id
      id
      cabinet
      civilite
      code_postal
      latitude
      longitude
      judgment_date
      is_urgent
      departement {
        id
        nom
        region {
          id
          nom
        }
      }
      ti {
        id
        etablissement
      }
      status
      nature_mesure
      champ_mesure
      ville
      lieu_vie
      numero_rg
      numero_dossier
      etablissement
      annee_naissance
      date_nomination
    }
  }
`;
