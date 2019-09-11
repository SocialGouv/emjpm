import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($antenneId: Int!) {
    mesures(where: { antenne_id: { _eq: 127 } }, limit: 10) {
      antenne_id
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
