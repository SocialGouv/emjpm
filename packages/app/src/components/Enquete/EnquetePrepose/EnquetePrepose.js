// import { Heading1 } from "@emjpm/ui";
import { useRouter } from "next/router";
import React from "react";
// import { useQuery } from "react-apollo";
import { Box, Flex } from "rebass";

import { MenuStepper } from "../../MenuStepper";
// import { EnquetePopulationsCuratelle, EnquetePopulationsTutelle } from "../EnquetePopulations";
// import { EnquetePreposeWelcome } from "./EnquetePreposeWelcome";
import { enquetePreposeMenuBuilder } from "./enquetePreposeMenuBuilder.service";

export const EnquetePrepose = props => {
  const router = useRouter();
  const { enquete, mandataireId, currentStep } = props;
  const { id: enqueteId } = enquete;

  const data = {};

  // const { data, loading, error } = useQuery(ENQUETE_MANDATAIRE_PREPOSE, {
  //   variables: { enqueteId, mandataireId }
  // });

  // if (loading) {
  //   return <Box mt={4}>Chargement...</Box>;
  // }

  // if (error) {
  //   return (
  //     <Box mt={4}>
  //       <Heading1 mb={4}>Oups</Heading1>
  //       <Box>Une erreur est survenue. Merci de réessayer ultérieurement.</Box>
  //     </Box>
  //   );
  // }

  const enqueteReponse = data ? data.enquete_individuel || {} : {};

  const sections = enquetePreposeMenuBuilder.buildMenuSections(enqueteReponse);

  const section = sections[currentStep.step];
  const ComponentForm = section.steps[currentStep.substep || 0].component;

  return (
    <Flex>
      <Box>
        <MenuStepper sections={sections} currentStep={currentStep} goToStep={goToStep} />
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <ComponentForm
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          mandataireId={mandataireId}
          goToPrevPage={() => goToPrevPage(sections, currentStep)}
          goToNextPage={() => goToNextPage(sections, currentStep)}
        />
      </Box>
    </Flex>
  );

  async function goToStep({ step, substep }) {
    await router.push("/mandataires/enquetes/[enquete_id]", {
      pathname: `/mandataires/enquetes/${enqueteId}`,
      query: { step, substep }
    });
    window.scrollTo(0, 0);
  }

  async function goToNextPage(sections, currentStep) {
    const { step, substep } = currentStep;
    const currentSection = sections[step];

    if (currentSection.steps.length <= 1 || substep + 1 === currentSection.steps.length) {
      await goToStep({ step: step + 1, substep: 0 });
    } else {
      await goToStep({ step, substep: substep + 1 });
    }
  }

  async function goToPrevPage(sections, currentStep) {
    const { step, substep } = currentStep;
    if (substep > 0) {
      await goToStep({ step, substep: substep - 1 });
    } else if (currentStep.step - 1 >= 0) {
      const substep = sections[currentStep.step - 1].steps.length;
      await goToStep({ step: currentStep.step - 1, substep: substep - 1 });
    }
  }
};

export default EnquetePrepose;
