import gql from "graphql-tag";

export const MESURES = gql`
  query magistratMesures(
    $natureMesure: nature_mesure_type
    $status: mesure_status_type
    $searchText: String
    $offset: Int
  ) {
    mesures_aggregate(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "en_attente" }
        nature_mesure: { _eq: $natureMesure }
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
      champ_protection
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
