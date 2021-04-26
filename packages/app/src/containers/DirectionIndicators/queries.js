import gql from "graphql-tag";

export const GET_DIRECTION_STATS_KPI = gql`
  query directionStatsKPI(
    $end: date
    $start: date
    $departementCode: String
    $regionId: Int
  ) {
    stat_available_mesures(
      departementCode: $departementCode
      regionId: $regionId
    ) {
      available_mesures_nb_global
      available_mesures_nb_real
      available_mesures_nb_over
      available_mesures_nb_unknown_mesures
      available_mesures_nb_unknown_gestion
    }
    stat_opened_mesures(
      end: $end
      start: $start
      departementCode: $departementCode
      regionId: $regionId
    ) {
      opened_mesures_nb
    }
    stat_closed_mesures(
      end: $end
      start: $start
      departementCode: $departementCode
      regionId: $regionId
    ) {
      closed_mesures_nb
    }
    gestionnaireIndNumber: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: "MANDATAIRE_IND" }
        departement: {
          _or: { id: { _eq: $departementCode }, id_region: { _eq: $regionId } }
        }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
    gestionnairePreNumber: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: "MANDATAIRE_PRE" }
        departement: {
          _or: { id: { _eq: $departementCode }, id_region: { _eq: $regionId } }
        }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
    gestionnaireServiceNumber: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: "SERVICE" }
        departement: {
          _or: { id: { _eq: $departementCode }, id_region: { _eq: $regionId } }
        }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
  }
`;
