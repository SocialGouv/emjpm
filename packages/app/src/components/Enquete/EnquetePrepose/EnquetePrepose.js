import React from "react";

import { MenuStepper } from "../../MenuStepper";
import {
  EnqueteActiviteAccompagnementJudiciaire,
  EnqueteActiviteCuratelleBiens,
  EnqueteActiviteCuratellePersonne,
  EnqueteActiviteCuratelleRenforcee,
  EnqueteActiviteCuratelleSimple,
  EnqueteActiviteRevisionMesures,
  EnqueteActiviteTutelle
} from "../EnqueteActivite";
import { EnquetePopulationsCuratelle, EnquetePopulationsTutelle } from "../EnquetePopulations";
import { EnquetePreposeWelcome } from "./EnquetePreposeWelcome";

export const EnquetePrepose = props => {
  const { mandataireId } = props;

  //   const { data, loading, error } = useQuery(ENQUETE_MANDATAIRE_PREPOSE, {
  //     variables: { enqueteId, mandataireId }
  //   });

  //   if (loading) {
  //     return <Box mt={4}>Chargement...</Box>;
  //   }

  //   if (error) {
  //     return (
  //       <Box mt={4}>
  //         <Heading1 mb={4}>Oups</Heading1>
  //         <Box>Une erreur est survenue. Merci de réessayer ultérieurement.</Box>
  //       </Box>
  //     );
  //   }

  const MENU_SECTIONS = [
    {
      steps: [
        {
          label: "Bienvenue",
          component: EnquetePreposeWelcome
        }
      ]
    },
    {
      label: "Votre activité",
      steps: [
        {
          label: "Curatelle renforcée",
          component: EnqueteActiviteCuratelleRenforcee,
          isValid: false
        },
        {
          label: "Curatelle simple",
          component: EnqueteActiviteCuratelleSimple,
          isValid: false
        },
        {
          label: "Tutelle",
          component: EnqueteActiviteTutelle,
          isValid: false
        },
        {
          label: "Mesure d'accompagnement judiciaire",
          component: EnqueteActiviteAccompagnementJudiciaire
        },
        {
          label: "Tutelle ou curatelle aux biens",
          component: EnqueteActiviteCuratelleBiens
        },
        {
          label: "Tutelle ou curatelle à la personne",
          component: EnqueteActiviteCuratellePersonne
        },
        {
          label: "Révision de mesures",
          component: EnqueteActiviteRevisionMesures
        }
      ]
    },
    {
      label: "Populations",
      steps: [
        { label: "Curatelle", component: EnquetePopulationsCuratelle, isValid: false },
        { label: "Tutelle", component: EnquetePopulationsTutelle },
        { label: "Mesure d'accompagnement de justice", component: EnquetePopulationsTutelle },
        { label: "Sauvegarde de justice", component: EnquetePopulationsTutelle },
        { label: "Autre", component: EnquetePopulationsTutelle }
      ]
    },
    {
      steps: [{ label: "Envoi de vos réponses", component: null }]
    }
  ];

  return <MenuStepper enqueteReponse={{}} mandataireId={mandataireId} sections={MENU_SECTIONS} />;
};

export default EnquetePrepose;
