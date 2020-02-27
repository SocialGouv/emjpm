import gql from "graphql-tag";

export const INDICATORS = gql`
  query Indicators($code: String) {
    departements(where: { code: { _eq: $code } }) {
      code
      nom
    }
    view_indicateur_login(where: { code: { _eq: $code } }) {
      count
      nom
      type
      code
    }
    view_indicateur_inscrit(where: { code: { _eq: $code } }) {
      count
      nom
      type
      code
    }
  }
`;

export const FRANCE_INDICATORS = gql`
  query Inscrits {
    serviceLoginCount: view_indicateur_login_aggregate(where: { type: { _eq: "service" } }) {
      aggregate {
        count(columns: count)
      }
    }
    individuelLoginCount: view_indicateur_login_aggregate(where: { type: { _eq: "individuel" } }) {
      aggregate {
        count(columns: count)
      }
    }
    preposeLoginCount: view_indicateur_login_aggregate(where: { type: { _eq: "prepose" } }) {
      aggregate {
        count(columns: count)
      }
    }
    serviceInscritCount: view_indicateur_inscrit_aggregate(where: { type: { _eq: "service" } }) {
      aggregate {
        count(columns: count)
      }
    }
    individuelInscritCount: view_indicateur_inscrit_aggregate(
      where: { type: { _eq: "individuel" } }
    ) {
      aggregate {
        count(columns: count)
      }
    }
    preposeInscritCount: view_indicateur_inscrit_aggregate(where: { type: { _eq: "prepose" } }) {
      aggregate {
        count(columns: count)
      }
    }
  }
`;
