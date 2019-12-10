import gql from "graphql-tag";

export const MANDATAIRE_MESURES = gql`
  query MandataireMesures(
    $limit: Int
    $mandataireId: Int
    $type: String
    $status: String
    $searchText: String
    $offset: Int
  ) {
    __typename
    mesures_aggregate(
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        type: { _eq: $type }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      offset: $offset
      limit: $limit
      order_by: { date_ouverture: desc_nulls_first }
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        type: { _eq: $type }
      }
    ) {
      annee
      antenne_id
      cabinet
      civilite
      code_postal
      created_at
      date_ouverture
      department_id
      etablissement
      etablissement_id
      extinction
      id
      is_urgent
      judgment_date
      mandataire_id
      numero_dossier
      numero_rg
      reason_extinction
      residence
      service_id
      status
      ti_id
      type
      ville
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
    }
  }
`;

export const DEPARTEMENTS = gql`
  {
    departements {
      id
      code
      nom
    }
  }
`;

export const USER_TRIBUNAL = gql`
  query UserTribunal {
    user_tis {
      id
      ti_id
      user_id
      ti {
        etablissement
        id
      }
    }
  }
`;
