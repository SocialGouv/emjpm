import gql from "graphql-tag";

export const LB_SUMMARY = gql`
  query listeBlancheSummary($departementCode: String) {
    individuel_finance_departement: lb_users_aggregate(
      where: {
        type: { _eq: "individuel" }
        lb_departements: {
          departement_code: { _eq: $departementCode }
          departement_financeur: { _eq: true }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    individuel: lb_users_aggregate(
      where: {
        type: { _eq: "individuel" }
        lb_departements: { departement_code: { _eq: $departementCode } }
      }
    ) {
      aggregate {
        count
      }
    }
    prepose: lb_users_aggregate(
      where: {
        type: { _eq: "prepose" }
        lb_user_etablissements: {
          etablissement: { departement_code: { _eq: $departementCode } }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    service: services_aggregate(
      where: { departement_code: { _eq: $departementCode } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
