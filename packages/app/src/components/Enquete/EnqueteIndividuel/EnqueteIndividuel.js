import { Heading1 } from "@emjpm/ui";
import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../../components/Commons";
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
export const EnqueteIndividuel = props => {
  const { enqueteId, mandataireId } = props;

  const [currentStep, setCurrentStep] = useState({ step: 0, substep: 0 });

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

  const enquete_individuel = data ? data.enquete_individuel || {} : {};

  const sections = buildMenuSections(enquete_individuel);

  const section = sections[currentStep.step];
  const ComponentForm = section.steps[currentStep.substep || 0].component;

  return (
    <Flex>
      <Box py={"50px"} px={4}>
        <MenuStepper
          sections={sections}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <Flex flexDirection="row" justifyContent="flex-end">
          <Box mr={1}>
            <LinkButton
              href={`/mandataires/enquetes/[enquete_id]/import`}
              asLink={`/mandataires/enquetes/${enqueteId}/import`}
            >
              Importez votre enquête
            </LinkButton>
          </Box>
        </Flex>

        <ComponentForm
          enqueteId={enqueteId}
          goToPrevPage={() => goToPrevPage(sections, currentStep, setCurrentStep)}
          goToNextPage={() => goToNextPage(sections, currentStep, setCurrentStep)}
        />
      </Box>
    </Flex>
  );
};

export default EnqueteIndividuel;

function goToNextPage(sections, currentStep, setCurrentStep) {
  const { step, substep } = currentStep;
  const currentSection = sections[step];

  if (currentSection.steps.length <= 1 || substep + 1 === currentSection.steps.length) {
    setCurrentStep({ step: step + 1, substep: 0 });
  } else {
    setCurrentStep({ step, substep: substep + 1 });
  }
}

function goToPrevPage(sections, currentStep, setCurrentStep) {
  const { step, substep } = currentStep;
  if (substep > 0) {
    setCurrentStep({ step, substep: substep - 1 });
  } else if (currentStep.step - 1 >= 0) {
    const substep = sections[currentStep.step - 1].steps.length;
    setCurrentStep({ step: currentStep.step - 1, substep: substep - 1 });
  }
}

function transformStatusToIsValidProperty(status) {
  if (status === 0) {
    return null;
  }

  return status === 2 ? true : false;
}

function buildMenuSections(enquete_individuel) {
  return [
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
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_activite_curatelle_renforcee_status
          )
        },
        {
          label: "Curatelle simple",
          component: EnqueteActiviteCuratelleSimple,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_activite_curatelle_simple_status
          )
        },
        {
          label: "Tutelle",
          component: EnqueteActiviteTutelle,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_activite_tutelle_status
          )
        },
        {
          label: "Mesure d'accompagnement judiciaire",
          component: EnqueteActiviteAccompagnementJudiciaire,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_activite_accompagnement_judiciaire_status
          )
        },
        {
          label: "Tutelle ou curatelle aux biens",
          component: EnqueteActiviteCuratelleBiens,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_activite_curatelle_biens_status
          )
        },
        {
          label: "Tutelle ou curatelle à la personne",
          component: EnqueteActiviteCuratellePersonne,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_activite_curatelle_personne_status
          )
        },
        {
          label: "Révision de mesures",
          component: EnqueteActiviteRevisionMesures,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_activite_revision_mesures_status
          )
        }
      ]
    },
    {
      label: "Populations",
      steps: [
        {
          label: "Curatelle",
          component: EnquetePopulationsCuratelle,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_populations_curatelle_status
          )
        },
        {
          label: "Tutelle",
          component: EnquetePopulationsTutelle,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_populations_tutelle_status
          )
        },
        {
          label: "Mesure d'accompagnement de justice",
          component: EnquetePopulationsTutelle,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_populations_accompagnement_judiciaire_status
          )
        },
        {
          label: "Sauvegarde de justice",
          component: EnquetePopulationsTutelle,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_populations_sauvegarde_justice_status
          )
        },
        {
          label: "Autre",
          component: EnquetePopulationsTutelle,
          isValid: transformStatusToIsValidProperty(
            enquete_individuel.enquete_reponses_populations_autre_status
          )
        }
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
}
