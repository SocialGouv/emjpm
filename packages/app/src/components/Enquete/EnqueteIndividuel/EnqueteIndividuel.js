import { Heading1 } from "@emjpm/ui";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-apollo";
import { Box, Flex } from "rebass";

import { MenuStepper } from "../../MenuStepper";
import { enqueteIndividuelMenuBuilder } from "./enqueteIndividuelMenuBuilder.service";
import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "./queries";
export const EnqueteIndividuel = props => {
  const router = useRouter();

  const { enqueteId, mandataireId, currentStep } = props;

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

  const enqueteReponse = data ? data.enqueteReponse || {} : {};

  const sections = enqueteIndividuelMenuBuilder.buildMenuSections(enqueteReponse);

  const section = sections[currentStep.step];
  const ComponentForm = section.steps[currentStep.substep || 0].component;

  return (
    <Flex>
      <Box>
        <MenuStepper sections={sections} currentStep={currentStep} goToStep={goToStep} />
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <ComponentForm
          enqueteId={enqueteId}
          enqueteReponse={enqueteReponse}
          mandataireId={mandataireId}
          goToPrevPage={() => goToPrevPage(sections, currentStep)}
          goToNextPage={() => goToNextPage(sections, currentStep)}
        />
      </Box>
    </Flex>
  );

  function goToStep({ step, substep }) {
    router.push("/mandataires/enquetes/[enquete_id]", {
      pathname: `/mandataires/enquetes/${enqueteId}`,
      query: { step, substep }
    });
  }

  function goToNextPage(sections, currentStep) {
    const { step, substep } = currentStep;
    const currentSection = sections[step];

    if (currentSection.steps.length <= 1 || substep + 1 === currentSection.steps.length) {
      goToStep({ step: step + 1, substep: 0 });
    } else {
      goToStep({ step, substep: substep + 1 });
    }
  }

  function goToPrevPage(sections, currentStep) {
    const { step, substep } = currentStep;
    if (substep > 0) {
      goToStep({ step, substep: substep - 1 });
    } else if (currentStep.step - 1 >= 0) {
      const substep = sections[currentStep.step - 1].steps.length;
      goToStep({ step: currentStep.step - 1, substep: substep - 1 });
    }
  }
};

export default EnqueteIndividuel;
