import gql from "graphql-tag";

export const EDIT_MESURE = gql`
  mutation EditMesure(
    $id: Int!
    $department_id: Int
    $date_ouverture: date
    $type: String
    $residence: String
    $code_postal: String
    $ville: String
    $civilite: String
    $annee: String
    $numero_dossier: String
    $numero_rg: String
    $ti_id: Int!
    $latitude: Float
    $longitude: Float
    $pays: String!
    $cabinet: String
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        date_ouverture: $date_ouverture
        department_id: $department_id
        type: $type
        residence: $residence
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee: $annee
        ti_id: $ti_id
        numero_dossier: $numero_dossier
        numero_rg: $numero_rg
        latitude: $latitude
        longitude: $longitude
        pays: $pays
        cabinet: $cabinet
      }
    ) {
      returning {
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
        mandataire_id
        date_ouverture
        latitude
        longitude
        ti {
          id
          etablissement
        }
        pays
        cabinet
      }
    }
  }
`;
