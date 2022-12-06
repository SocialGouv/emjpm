import gql from "graphql-tag";

export const INDICATORS = gql`
  query Indicators(
    $code: String
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    serviceLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "service" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    individuelLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "individuel" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    preposeLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "prepose" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    magistratLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "ti" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    greffierLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "greffier" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    directionLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "direction" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    dpfiLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "dpfi" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    sdpfLoginCount: view_departement_indicateur_login_aggregate(
      where: { type: { _eq: "sdpf" }, id: { _eq: $code } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }

    serviceInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "service" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    individuelInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "individuel" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    preposeInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "prepose" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    magistratInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "ti" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    greffierInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "greffier" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    directionInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "direction" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    dpfiInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "dpfi" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    sdpfInscritCount: view_departement_indicateur_inscrit_aggregate(
      where: { _and: { type: { _eq: "sdpf" }, id: { _eq: $code } } }
    ) {
      aggregate {
        sum {
          count
        }
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
  }
`;

export const FRANCE_INDICATORS = gql`
  query AllIndicators(
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    serviceLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "service" } }
    ) {
      count
    }
    individuelLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "individuel" } }
    ) {
      count
    }
    preposeLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "prepose" } }
    ) {
      count
    }
    magistratLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "ti" } }
    ) {
      count
    }
    greffierLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "greffier" } }
    ) {
      count
    }
    directionLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "direction" } }
    ) {
      count
    }
    dpfilLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "dpfi" } }
    ) {
      count
    }
    sdpfLoginCount: view_nation_indicateur_login(
      where: { type: { _eq: "sdpf" } }
    ) {
      count
    }

    serviceInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "service" } }
    ) {
      count
    }

    individuelInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "individuel" } }
    ) {
      count
    }
    preposeInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "prepose" } }
    ) {
      count
    }
    magistratInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "ti" } }
    ) {
      count
    }
    greffierInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "greffier" } }
    ) {
      count
    }
    directionInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "direction" } }
    ) {
      count
    }
    dpfiInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "dpfi" } }
    ) {
      count
    }
    sdpfInscritCount: view_nation_indicateur_inscrit(
      where: { type: { _eq: "sdpf" } }
    ) {
      count
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
