import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($department: Int, $region: Int) {
    mesures(
      limit: 10
      where: { departement: { _or: { id: { _eq: $department }, id_region: { _eq: $region } } } }
    ) {
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
