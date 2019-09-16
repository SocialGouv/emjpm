import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($antenne: Int, $type: String, $status: String) {
    mesures_aggregate(
      where: {
        status: { _eq: "Mesure en attente" }
        type: { _eq: $type }
        antenne_id: { _eq: $antenne }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(limit: 10, where: { status: { _eq: "Mesure en attente" }, type: { _eq: $type } }) {
      id
      cabinet
      civilite
      code_postal
      departement {
        nom
        region {
          nom
        }
      }
      status
      type
      ville
      residence
      numero_rg
      numero_dossier
      etablissement
      annee
      date_ouverture
    }
  }
`;
