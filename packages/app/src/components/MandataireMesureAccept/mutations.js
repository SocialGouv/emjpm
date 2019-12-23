import gql from "graphql-tag";

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int!
    $date_ouverture: date!
    $residence: String!
    $code_postal: String!
    $ville: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        department_id: $department_id
        status: "Mesure en cours"
        date_ouverture: $date_ouverture
        residence: $residence
        code_postal: $code_postal
        ville: $ville
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      returning {
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
        mandataire_id
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;
