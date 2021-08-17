import gql from "graphql-tag";

export const CHECK_MESURE_EXISTS_QUERY = gql`
  query CHECK_MESURE_EXISTS_QUERY(
    $tiId: Int!
    $mandataireId: Int
    $serviceId: Int
    $numeroRG: String!
  ) {
    mesures(
      where: {
        ti_id: { _eq: $tiId }
        mandataire_id: { _eq: $mandataireId }
        service_id: { _eq: $serviceId }
        numero_rg: { _eq: $numeroRG }
      }
      limit: 1
    ) {
      id
      status
    }
  }
`;

export const MAGISTRAT_MESURES_QUERY = gql`
  query MAGISTRAT_MESURE_QUERY(
    $tiId: Int!
    $natureMesure: nature_mesure_enum
    $etatMesure: mesure_status_enum
    $searchText: String
    $offset: Int
  ) {
    mesures_aggregate: search_mesures_aggregate(
      args: { search: $searchText }
      where: {
        nature_mesure: { _eq: $natureMesure }
        status: { _eq: $etatMesure }
        ti_id: { _eq: $tiId }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures: search_mesures(
      args: { search: $searchText }
      where: {
        nature_mesure: { _eq: $natureMesure }
        status: { _eq: $etatMesure }
        ti_id: { _eq: $tiId }
      }
      offset: $offset
      limit: 20
      order_by: [{ status: asc }, { created_at: desc }]
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
      en_attente_reouverture
      mesure_en_attente_reouvertures(limit: 1) {
        id
        annee_naissance
        cabinet
        champ_mesure
        civilite
        judgment_date
        magistrat_id
        mandataire_id
        service_id
        ti_id
        is_urgent
        antenne_id
        nature_mesure
      }
    }
  }
`;
