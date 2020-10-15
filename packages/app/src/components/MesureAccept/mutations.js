import gql from "graphql-tag";

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int
    $date_nomination: date!
    $lieu_vie: lieu_vie_type!
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
        nature_mesure
        champ_mesure
        ville
        lieu_vie
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

export const RECALCULATE_SERVICE_MESURES = gql`
  mutation update_service_mesures($service_id: Int!) {
    recalculateServiceMesuresCount(serviceId: $service_id) {
      success
      updatedRows
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
