import gql from "graphql-tag";

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int
    $date_ouverture: date!
    $residence: String!
    $code_postal: String
    $ville: String
    $antenne_id: Int
    $latitude: Float
    $longitude: Float
    $pays: String!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        antenne_id: $antenne_id
        department_id: $department_id
        status: "Mesure en cours"
        date_ouverture: $date_ouverture
        residence: $residence
        code_postal: $code_postal
        ville: $ville
        latitude: $latitude
        longitude: $longitude
        pays: $pays
      }
    ) {
      returning {
        antenne_id
        service_id
        id
        cabinet
        civilite
        code_postal
        departement {
          id
          nom
          region {
            id
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
        pays
      }
    }
  }
`;
