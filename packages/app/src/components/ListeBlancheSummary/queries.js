import gql from "graphql-tag";

export const LB_SUMMARY = gql`
  query listeBlancheSummary($departementId: Int) {
    individuel: lb_users_aggregate(
      where: {
        type: { _eq: "individuel" }
        lb_departements: {
          departement_id: { _eq: $departementId }
          departement_financeur: { _eq: true }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    prepose: lb_users_aggregate(
      where: {
        type: { _eq: "prepose" }
        lb_departements: {
          departement_id: { _eq: $departementId }
          departement_financeur: { _eq: true }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
