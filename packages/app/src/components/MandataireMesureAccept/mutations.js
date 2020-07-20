import gql from "graphql-tag";

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int
    $date_nomination: date!
    $lieu_vie: lieu_vie_type!
    $code_postal: String
    $ville: String
    $latitude: Float
    $longitude: Float
    $pays: String!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        department_id: $department_id
        status: "en_cours"
        date_nomination: $date_nomination
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
        latitude: $latitude
        longitude: $longitude
        pays: $pays
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
        nature_mesure
        champ_mesure
        ville
        lieu_vie
        mandataire_id
        numero_rg
        numero_dossier
        etablissement
        annee_naissance
        date_nomination
        pays
      }
    }
  }
`;

export const RECALCULATE_MANDATAIRE_MESURES = gql`
  mutation update_mandataire_mesures($mandataire_id: Int!) {
    recalculateMandataireMesuresCount(mandataireId: $mandataire_id) {
      success
      updatedRows
    }
  }
`;

export const MANDATAIRE = gql`
  query mandataire($id: Int) {
    mandataires(where: { id: { _eq: $id } }) {
      id
      mesures_en_attente
      mesures_en_cours
    }
  }
`;
