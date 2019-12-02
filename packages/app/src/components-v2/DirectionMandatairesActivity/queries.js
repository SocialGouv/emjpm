import gql from "graphql-tag";

export const MANDATAIRE_ACTIVITY = gql`
  query mesureInProgressByGestionnaireNumber($department: Int, $region: Int) {
    service: view_mesure_gestionnaire_aggregate(
      where: {
        departement: { _or: { id: { _eq: $department }, id_region: { _eq: $region } } }
        discriminator: { _eq: "SERVICE" }
      }
    ) {
      aggregate {
        sum {
          mesures_in_progress
        }
      }
    }
    mandataireIndividuel: view_mesure_gestionnaire_aggregate(
      where: {
        departement: { _or: { id: { _eq: $department }, id_region: { _eq: $region } } }
        discriminator: { _eq: "MANDATAIRE_IND" }
      }
    ) {
      aggregate {
        sum {
          mesures_in_progress
        }
      }
    }
    mandatairePrepose: view_mesure_gestionnaire_aggregate(
      where: {
        departement: { _or: { id: { _eq: $department }, id_region: { _eq: $region } } }
        discriminator: { _eq: "MANDATAIRE_PRE" }
      }
    ) {
      aggregate {
        sum {
          mesures_in_progress
        }
      }
    }
  }
`;
