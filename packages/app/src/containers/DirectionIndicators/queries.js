import gql from "graphql-tag";

export const GET_OPEN_MESURE_NUMBER = gql`
  query openedMesureNumber(
    $end: date!
    $start: date!
    $departementCode: Int
    $regionId: Int
  ) {
    stat_opened_mesures(
      end: $end
      start: $start
      departementCode: $departementCode
      regionId: $regionId
    ) {
      opened_mesures_nb
    }
  }
`;

export const GET_AVAILABLE_MESURE_NUMBER = gql`
  query stat_available_mesures($departementCode: String, $regionId: Int) {
    stat_available_mesures(
      departementCode: $departementCode
      regionId: $regionId
    ) {
      available_mesures_nb
    }
  }
`;

export const GET_CLOSED_MESURE_NUMBER = gql`
  query closedMesureNumber(
    $end: date!
    $start: date!
    $departementCode: String
    $regionId: Int
  ) {
    stat_closed_mesures(
      end: $end
      start: $start
      departementCode: $departementCode
      regionId: $regionId
    ) {
      closed_mesures_nb
    }
  }
`;

export const GET_GESTIONNAIRE_NUMBER = gql`
  query gestionnaireNumber($type: String, $department: Int, $region: Int) {
    gestionnaireNumber: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: $type }
        departement: {
          _or: { id: { _eq: $department }, id_region: { _eq: $region } }
        }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
  }
`;
