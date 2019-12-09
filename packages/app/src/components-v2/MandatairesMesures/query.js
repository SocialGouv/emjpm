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
        mandataire_id: { _eq: $mandataireId }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      offset: $offset
      limit: $limit
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        type: { _eq: $type }
        mandataire_id: { _eq: $mandataireId }
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
    }
  }
`;
