import gql from "graphql-tag";

export const LB_SUMMARY = gql`
  query listeBlancheSummary($departementIds: [Int!]!) {
    individuel_finance: lb_users_aggregate(
      where: {
        type: { _eq: "individuel" }
        lb_departements: {
          departement_id: { _in: $departementIds }
          departement_financeur: { _eq: true }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    prepose_rattache: lb_users_aggregate(
      where: {
        type: { _eq: "prepose" }
        lb_user_etablissements: {
          etablissement: { departement_id: { _in: $departementIds } }
          etablissement_rattachement: { _eq: true }
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
        lb_departements: { departement_id: { _in: $departementIds } }
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
          etablissement: { departement_id: { _in: $departementIds } }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    service: services_aggregate(
      where: { department_id: { _in: $departementIds } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
