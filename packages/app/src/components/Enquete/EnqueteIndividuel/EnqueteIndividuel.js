import { Heading1 } from "@emjpm/ui";
import React from "react";
import { useQuery } from "react-apollo";
import { Box } from "rebass";

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
import {
  EnqueteIndividuelInformations,
  EnqueteIndividuelInformationsAgrements,
  EnqueteIndividuelInformationsFormation
} from "../EnqueteIndividuelInformations";
import { EnqueteIndividuelPrestationsSociales } from "../EnqueteIndividuelPrestationsSociales";
import { EnquetePopulationsCuratelle, EnquetePopulationsTutelle } from "../EnquetePopulations";
import { EnqueteIndividuelWelcome } from "./EnqueteIndividuelWelcome";
import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "./queries";

function transformStatusToIsValidProperty(status) {
  if (status === 0) {
    return null;
  }

  return status === 2 ? true : false;
}

export const EnqueteIndividuel = props => {
  const { enqueteId, mandataireId } = props;

  const { data, loading, error } = useQuery(ENQUETE_MANDATAIRE_INDIVIDUEL, {
    variables: { enqueteId, mandataireId }
  });

  if (loading) {
    return <Box mt={4}>Chargement...</Box>;
  }

  if (error) {
    return (
      <Box mt={4}>
        <Heading1 mb={4}>Oups</Heading1>
        <Box>Une erreur est survenue. Merci de réessayer ultérieurement.</Box>
      </Box>
    );
  }

  const { enquete_individuel } = data;

  const MENU_SECTIONS = [
    {
      steps: [
        {
          label: "Bienvenue",
          component: EnqueteIndividuelWelcome
        }
      ]
    },
    {
      label: "Vos informations",
      steps: [
        {
          label: "Informations générales",
          component: EnqueteIndividuelInformations,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_informations_mandataire_generales_status
          )
        },
        {
          label: "Agréments",
          component: EnqueteIndividuelInformationsAgrements,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_informations_mandataire_agrements_status
          )
        },
        {
          label: "Formation",
          component: EnqueteIndividuelInformationsFormation,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_informations_mandataire_formation_status
          )
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
      label: "Prestations sociales",
      steps: [{ label: "Prestations sociales", component: EnqueteIndividuelPrestationsSociales }]
    },
    {
      steps: [{ label: "Envoi de vos réponses", component: null }]
    }
  ];

  return (
    <MenuStepper
      enqueteReponse={enquete_individuel}
      mandataireId={mandataireId}
      sections={MENU_SECTIONS}
    />
  );
};

export default EnqueteIndividuel;
