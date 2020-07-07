import gql from "graphql-tag";

export const MANDATAIRE = gql`
  query mandataire($id: Int) {
    mandataires(where: { id: { _eq: $id } }) {
      id
      mesures_en_attente
      mesures_en_cours
    }
  }
`;

export const MANDATAIRE_MESURES = gql`
  query MandataireMesures(
    $limit: Int
    $type: String
    $status: String!
    $searchText: String
    $excludeStatus: String
    $offset: Int
  ) {
    mesures_aggregate(
      where: {
        _or: [{ numero_dossier: { _ilike: $searchText } }, { numero_rg: { _ilike: $searchText } }]
        status: { _eq: $status }
        _not: { status: { _eq: $excludeStatus } }
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
        _not: { status: { _eq: $excludeStatus } }
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
      lieu_vie
      service_id
      status
      ti_id
      type
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
  query user_tribunal($id: Int!) {
    user_tis(order_by: { ti: { ville: asc } }, where: { user_id: { _eq: $id } }) {
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
