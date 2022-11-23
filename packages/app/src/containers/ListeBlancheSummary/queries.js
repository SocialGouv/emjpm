import gql from "graphql-tag";

export const LB_SUMMARY = gql`
  query listeBlancheSummary($departementCode: String) {
    individuel_finance_departement: liste_blanche_aggregate(
      where: {
        type: { _eq: "individuel" }
        mandataire_individuel_departements: {
          departement_code: { _eq: $departementCode }
          departement_financeur: { _eq: true }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    individuel: liste_blanche_aggregate(
      where: {
        type: { _eq: "individuel" }
        mandataire_individuel_departements: {
          departement_code: { _eq: $departementCode }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    dpfi: liste_blanche_aggregate(
      where: {
        type: { _eq: "dpfi" }
        dpfi_departements: { departement_code: { _eq: $departementCode } }
      }
    ) {
      aggregate {
        count
      }
    }
    dpfi_finance_departement: liste_blanche_aggregate(
      where: {
        type: { _eq: "dpfi" }
        dpfi_departements: {
          departement_code: { _eq: $departementCode }
          departement_financeur: { _eq: true }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    sdpf: sdpf_aggregate(where: { departement: { _eq: $departementCode } }) {
      aggregate {
        count
      }
    }
    prepose: liste_blanche_aggregate(
      where: {
        type: { _eq: "prepose" }
        mandataire_prepose_etablissements: {
          etablissement: { departement_code: { _eq: $departementCode } }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    service: services_aggregate(
      where: {
        service_departements: { departement_code: { _eq: $departementCode } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
