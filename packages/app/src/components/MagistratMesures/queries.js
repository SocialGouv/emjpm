import gql from "graphql-tag";

export const MESURES = gql`
  query magistratMesures(
    $nature_mesure: nature_mesure_type
    $status: String
    $searchText: String
    $offset: Int
  ) {
    mesures_aggregate(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "Mesure en attente" }
        nature_mesure: { _eq: $nature_mesure }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "Mesure en attente" }
        nature_mesure: { _eq: $nature_mesure }
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
