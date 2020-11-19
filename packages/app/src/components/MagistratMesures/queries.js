import gql from "graphql-tag";

export const MAGISTRAT_MESURES_QUERY = gql`
  query MAGISTRAT_MESURE_QUERY(
    $tiId: Int!
    $natureMesure: nature_mesure_type
    $searchText: String
    $offset: Int
  ) {
    mesures_aggregate(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "en_attente" }
        nature_mesure: { _eq: $natureMesure }
        ti_id: { _eq: $tiId }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "en_attente" }
        nature_mesure: { _eq: $natureMesure }
        ti_id: { _eq: $tiId }
      }
      offset: $offset
      limit: 20
      order_by: { created_at: desc }
    ) {
      id
      cabinet
      civilite
      code_postal
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
      annee_naissance
      date_nomination
    }
  }
`;
