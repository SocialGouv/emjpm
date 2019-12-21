import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($id: Int) {
    mesures(where: { id: { _eq: $id } }) {
      service_antenne {
        name
      }
      service_id
      id
      cabinet
      civilite
      code_postal
      antenne_id
      latitude
      longitude
      judgment_date
      is_urgent
      departement {
        nom
        region {
          nom
        }
      }
      ti {
        id
        etablissement
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
