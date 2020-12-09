import gql from "graphql-tag";

export const MESURES_QUERY = gql`
  query MESURES_QUERY(
    $limit: Int
    $natureMesure: nature_mesure_enum
    $status: mesure_status_enum!
    $searchText: String
    $offset: Int
    $antenne: Int
    $orderBy: mesures_order_by! = { date_nomination: desc_nulls_first }
  ) {
    mesures_aggregate(
      where: {
        _or: [
          { numero_dossier: { _ilike: $searchText } }
          { numero_rg: { _ilike: $searchText } }
        ]
        status: { _eq: $status }
        nature_mesure: { _eq: $natureMesure }
        antenne_id: { _eq: $antenne }
      }
    ) {
      aggregate {
        count
      }
    }
    awaiting_mesures: mesures(where: { status: { _eq: en_attente } }) {
      annee_naissance
      antenne_id
      cabinet
      civilite
      code_postal
      created_at
      date_nomination
      department_id
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

    mesures(
      offset: $offset
      limit: $limit
      order_by: [$orderBy]
      where: {
        _or: [
          { numero_dossier: { _ilike: $searchText } }
          { numero_rg: { _ilike: $searchText } }
        ]
        status: { _eq: $status }
        nature_mesure: { _eq: $natureMesure }
        antenne_id: { _eq: $antenne }
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
