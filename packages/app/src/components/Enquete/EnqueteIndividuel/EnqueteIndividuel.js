import { Heading1 } from "@emjpm/ui";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useQuery } from "react-apollo";
import { Box, Flex, Text } from "rebass";

import { MenuStepper } from "../../MenuStepper";
import { EnqueteConfirmExitInvalidFormDialog } from "../EnqueteConfirmExitInvalidFormDialog";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { useEnqueteContext } from "../useEnqueteContext.hook";
import { enqueteIndividuelMenuBuilder } from "./enqueteIndividuelMenuBuilder.service";
export const EnqueteIndividuel = props => {
  const router = useRouter();

  const { enquete, userId, currentStep } = props;
  const { id: enqueteId } = enquete;

  const { data, loading, error } = useQuery(ENQUETE_REPONSE_STATUS, {
    variables: { enqueteId, userId }
  });

  const enqueteReponse = data ? data.enquete_reponse_status || {} : {};

  const sections = useMemo(
    () => (!data ? undefined : enqueteIndividuelMenuBuilder.buildMenuSections(enqueteReponse)),
    [enqueteReponse, data]
  );

  const { section, step } = useMemo(() => {
    const section = !sections ? undefined : sections[currentStep.step];
    const step = !section ? undefined : section.steps[currentStep.substep || 0];
    return { section, step };
  }, [currentStep.step, currentStep.substep, sections]);

  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    saveAndNavigate,
    confirmExitInvalidFormDialog
  } = useEnqueteContext({
    currentStep,
    section,
    navigateToStep,
    sections
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

  if (!step || !section) {
    navigateToStep({ step: 0, substep: 0 });
    return <Box mt={4}>Redirection...</Box>;
  }
  const ComponentForm = step.component;

  return (
    <Flex>
      <Box>
        <MenuStepper
          sections={sections}
          currentStep={currentStep}
          onClickLink={x => saveAndNavigate(x)}
        />
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <ComponentForm
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          userId={userId}
          section={section}
          step={step}
          enqueteContext={enqueteContext}
          dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
          goToFirstPage={() => navigateToStep({ step: 1, substep: 0 })}
        />
        <EnqueteConfirmExitInvalidFormDialog {...confirmExitInvalidFormDialog} />
      </Box>
    </Flex>
  );

  async function navigateToStep({ step, substep }) {
    if (step === undefined || substep === undefined) {
      return;
    }
    if (step !== currentStep.step || substep !== currentStep.substep) {
      await router.push("/mandataires/enquetes/[enquete_id]", {
        pathname: `/mandataires/enquetes/${enqueteId}`,
        query: { step, substep }
      });
      window.scrollTo(0, 0);
    }
  }
};

export default EnqueteIndividuel;
