import gql from "graphql-tag";

export const ENQUETE_MANDATAIRE_INDIVIDUEL = gql`
  query enquete_mandataire_individuel($enqueteId: Int!, $mandataireId: Int!) {
    enquete_individuel(enqueteId: $enqueteId, mandataireId: $mandataireId) {
      submitted_at
      enquete_id
      enquete_reponses_id
      enquete_reponses_status
      enquete_reponses_informations_mandataire_id
      enquete_reponses_informations_mandataire_generales_status
      enquete_reponses_informations_mandataire_formation_status
      enquete_reponses_informations_mandataire_agrements_status
      enquete_reponses_activite_id
      enquete_reponses_populations_id
      enquete_reponses_populations_curatelle_status
      enquete_reponses_populations_tutelle_status
      enquete_reponses_populations_accompagnement_judiciaire_status
      enquete_reponses_populations_sauvegarde_justice_status
      enquete_reponses_populations_autre_status
      enquete_reponses_prestations_sociale_id
      enquete_reponses_agrements_formations_id
    }
  }
`;
