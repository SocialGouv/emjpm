import { Heading1 } from "@emjpm/ui";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useQuery } from "react-apollo";
import { Box, Flex, Text } from "rebass";

import { MenuStepper } from "../../MenuStepper";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { enquetePreposeMenuBuilder } from "./enquetePreposeMenuBuilder.service";

export const EnquetePrepose = props => {
  const router = useRouter();
  const { enquete, userId, currentStep } = props;
  const { id: enqueteId } = enquete;

  const { data, loading, error } = useQuery(ENQUETE_REPONSE_STATUS, {
    variables: { enqueteId, userId }
  });

  const enqueteReponse = data ? data.enquete_reponse_status || {} : {};

  const sections = useMemo(
    () => (!data ? undefined : enquetePreposeMenuBuilder.buildMenuSections(enqueteReponse)),
    [enqueteReponse, data]
  );

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

  const section = sections[currentStep.step];
  const step = section.steps[currentStep.substep || 0];

  if (!step || !section) {
    onClickLink({ step: 0, substep: 0 });
    return <Box mt={4}>Redirection...</Box>;
  }
  const ComponentForm = step.component;

  if (enqueteReponse.submitted_at) {
    return (
      <Box py={"50px"}>
        <Heading1 textAlign="center">
          {enqueteReponse.submitted_at
            ? `Vos réponses à l’enquête ${enquete.annee} ont bien été envoyées.`
            : "Envoi de vos réponses"}
        </Heading1>
        <Box sx={{ textAlign: "center", lineHeight: "30px", marginTop: 4 }}>
          <Text>Nous vous remercions pour le temps que vous nous avez accordé.</Text>
          <Text>À bientôt,</Text>
          <Text>Votre direction régionale</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Flex>
      <Box>
        <MenuStepper sections={sections} currentStep={currentStep} onClickLink={onClickLink} />
      </Box>
      <Box py={"50px"} px={"35px"} flex={1}>
        <ComponentForm
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          section={section}
          step={step}
          userId={userId}
          goToPrevPage={() => goToPrevPage(sections, currentStep)}
          goToNextPage={() => goToNextPage(sections, currentStep)}
        />
      </Box>
    </Flex>
  );

  async function onClickLink({ step, substep }) {
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
      await onClickLink({ step: step + 1, substep: 0 });
    } else {
      await onClickLink({ step, substep: substep + 1 });
    }
  }

  async function goToPrevPage(sections, currentStep) {
    const { step, substep } = currentStep;
    if (substep > 0) {
      await onClickLink({ step, substep: substep - 1 });
    } else if (currentStep.step - 1 >= 0) {
      const substep = sections[currentStep.step - 1].steps.length;
      await onClickLink({ step: currentStep.step - 1, substep: substep - 1 });
    }
  }
};

export default EnquetePrepose;
