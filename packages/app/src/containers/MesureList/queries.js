import gql from "graphql-tag";

export const MESURES_QUERY = gql`
  query MESURES_QUERY(
    $limit: Int
    $natureMesure: nature_mesure_enum
    $status: mesure_status_enum!
    $departement: String
    $searchText: String
    $offset: Int
    $antenne: Int
    $orderBy: [mesures_order_by!]
  ) {
    mesures_aggregate: search_mesures_aggregate(
      args: { search: $searchText }
      where: {
        status: { _eq: $status }
        nature_mesure: { _eq: $natureMesure }
        antenne_id: { _eq: $antenne }
        departement_code: { _eq: $departement }
      }
    ) {
      aggregate {
        count
      }
    }

    awaiting_mesures: mesures(
      where: {
        status: { _eq: en_attente }
        departement_code: { _eq: $departement }
      }
    ) {
      annee_naissance
      antenne_id
      cabinet
      civilite
      code_postal
      created_at
      date_nomination
      departement_code
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

    mesures: search_mesures(
      offset: $offset
      limit: $limit
      order_by: $orderBy
      args: { search: $searchText }
      where: {
        status: { _eq: $status }
        nature_mesure: { _eq: $natureMesure }
        antenne_id: { _eq: $antenne }
        departement_code: { _eq: $departement }
      }
    ) {
      annee_naissance
      antenne_id
      cabinet
      civilite
      code_postal
      created_at
      date_nomination
      departement_code
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
