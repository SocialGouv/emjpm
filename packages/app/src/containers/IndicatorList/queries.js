import gql from "graphql-tag";

export const INDICATORS = gql`
  query Indicators(
    $code: String
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    view_indicateur_login(where: { id: { _eq: $code } }) {
      count
      nom
      type
      id
    }

    magistratInscritCount: view_users_stats_aggregate(
      where: { _and: { type: { _eq: "ti" }, departement_code: { _eq: $code } } }
    ) {
      aggregate {
        count
      }
    }

    serviceInscritCount: view_users_stats_aggregate(
      where: {
        _and: { type: { _eq: "service" }, departement_code: { _eq: $code } }
      }
    ) {
      aggregate {
        count
      }
    }
    individuelInscritCount: view_users_stats_aggregate(
      where: {
        _and: { type: { _eq: "individuel" }, departement_code: { _eq: $code } }
      }
    ) {
      aggregate {
        count
      }
    }
    preposeInscritCount: view_users_stats_aggregate(
      where: {
        _and: { type: { _eq: "prepose" }, departement_code: { _eq: $code } }
      }
    ) {
      aggregate {
        count
      }
    }

    mesuresLastMonthCount: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
          departement: { id: { _eq: $code } }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    mesuresLastMonthCountTotal: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const FRANCE_INDICATORS = gql`
  query AllIndicators(
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    serviceLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "service" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    individuelLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "individuel" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    preposeLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "prepose" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    magistratLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "ti" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }

    serviceInscritCount: view_users_stats_aggregate(
      where: { type: { _eq: "service" } }
    ) {
      aggregate {
        count
      }
    }

    individuelInscritCount: view_users_stats_aggregate(
      where: { type: { _eq: "individuel" } }
    ) {
      aggregate {
        count
      }
    }
    preposeInscritCount: view_users_stats_aggregate(
      where: { type: { _eq: "prepose" } }
    ) {
      aggregate {
        count
      }
    }

    magistratInscritCount: view_users_stats_aggregate(
      where: { type: { _eq: "ti" } }
    ) {
      aggregate {
        count
      }
    }
    mesuresLastMonthCount: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
