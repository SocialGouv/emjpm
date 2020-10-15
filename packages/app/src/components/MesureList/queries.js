import gql from "graphql-tag";

export const MESURES_QUERY = gql`
  query MESURES_QUERY(
    $limit: Int
    $natureMesure: nature_mesure_type
    $status: mesure_status_type!
    $searchText: String
    $offset: Int
  ) {
    mesures_aggregate(
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        nature_mesure: { _eq: $natureMesure }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      offset: $offset
      limit: $limit
      order_by: { date_nomination: desc_nulls_first }
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        nature_mesure: { _eq: $natureMesure }
      }
    ) {
      annee_naissance
      antenne_id
      cabinet
      civilite
      code_postal
      created_at
      date_nomination
      department_id
      etablissement
      etablissement_id
      date_fin_mesure
      id
      is_urgent
      judgment_date
      mandataire_id
      numero_dossier
      numero_rg
      cause_sortie
      lieu_vie
      service_id
      status
      ti_id
      nature_mesure
      champ_mesure
      ville
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
    }
  }
`;
