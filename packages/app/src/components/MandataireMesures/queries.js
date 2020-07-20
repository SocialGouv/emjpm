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
