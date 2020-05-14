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
import { EnquetePopulationsCuratelle } from "../EnquetePopulations/EnquetePopulationsCuratelle";
import { EnqueteIndividuelWelcome } from "./EnqueteIndividuelWelcome";
import { ENQUETE_INDIVIDUEL_RESPONSE } from "./queries";

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
        component: EnqueteIndividuelInformations
      },
      {
        label: "Agréments",
        component: EnqueteIndividuelInformationsAgrements
      },
      {
        label: "Formation",
        component: EnqueteIndividuelInformationsFormation
      }
    ]
  },
  {
    label: "Votre activité",
    steps: [
      {
        label: "Curatelle renforcée",
        component: EnqueteActiviteCuratelleRenforcee
      },
      {
        label: "Curatelle simple",
        component: EnqueteActiviteCuratelleSimple
      },
      {
        label: "Tutelle",
        component: EnqueteActiviteTutelle
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
      { label: "Curatelle", component: EnquetePopulationsCuratelle },
      { label: "Tutelle", component: EnquetePopulationsCuratelle },
      { label: "Mesure d'accompagnement de justice", component: EnquetePopulationsCuratelle },
      { label: "Sauvegarde de justice", component: EnquetePopulationsCuratelle },
      { label: "Autre", component: EnquetePopulationsCuratelle }
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

export const EnqueteIndividuel = props => {
  const { enqueteId, mandataireId } = props;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_RESPONSE, {
    variables: { enqueteId, mandataireId }
  });

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { enqueteIndividuelReponse } = data;

  return (
    <MenuStepper
      enqueteReponse={enqueteIndividuelReponse}
      mandataireId={mandataireId}
      sections={MENU_SECTIONS}
    />
  );
};

export default EnqueteIndividuel;
