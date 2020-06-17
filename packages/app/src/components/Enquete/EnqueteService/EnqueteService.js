import { Heading1 } from "@emjpm/ui";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useQuery } from "react-apollo";
import { Box, Flex } from "rebass";

import { MenuStepper } from "../../MenuStepper";
import { EnqueteConfirmExitInvalidFormDialog } from "../EnqueteConfirmExitInvalidFormDialog";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { useEnqueteContext } from "../useEnqueteContext.hook";
import { buildMenuSections } from "./EnqueteServiceMenuBuilder.service";

export const EnqueteService = (props) => {
  const router = useRouter();
  const { enquete, userId, currentStep } = props;
  const { id: enqueteId } = enquete;
  console.log("userId", userId);

  const { data, loading, error } = useQuery(ENQUETE_REPONSE_STATUS, {
    variables: { enqueteId, userId },
  });

  const enqueteReponse = data ? data.enquete_reponse_status || {} : {};

  const sections = useMemo(() => (!data ? undefined : buildMenuSections(enqueteReponse)), [
    enqueteReponse,
    data,
  ]);

  const {
    section,
    step,
    enqueteContext,
    dispatchEnqueteContextEvent,
    saveAndNavigate,
    confirmExitInvalidFormDialog,
  } = useEnqueteContext({
    currentStep,
    navigateToStep,
    sections,
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

  if (!step || !section) {
    onClickLink({ step: 0, substep: 0 });
    return <Box mt={4}>Redirection...</Box>;
  }
  const ComponentForm = step.component;

  return (
    <Flex>
      <Box>
        <MenuStepper
          sections={sections}
          currentStep={currentStep}
          onClickLink={(x) => saveAndNavigate(x)}
        />
      </Box>
      <Box py={"50px"} px={"35px"} flex={1}>
        <ComponentForm
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          userId={userId}
          section={section}
          step={step}
          enqueteContext={enqueteContext}
          dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
          goToFirstPage={() => goToFirstPage()}
        />
        <EnqueteConfirmExitInvalidFormDialog {...confirmExitInvalidFormDialog} />
      </Box>
    </Flex>
  );

  function goToFirstPage() {
    navigateToStep({ step: 1, substep: 0 });
  }

  async function onClickLink({ step, substep }) {
    await router.push("/services/enquetes/[enquete_id]", {
      pathname: `/services/enquetes/${enqueteId}`,
      query: { step, substep },
    });
    window.scrollTo(0, 0);
  }

  async function navigateToStep({ step, substep }) {
    if (step === undefined || substep === undefined) {
      return;
    }
    if (step !== currentStep.step || substep !== currentStep.substep) {
      await router.push("/services/enquetes/[enquete_id]", {
        pathname: `/services/enquetes/${enqueteId}`,
        query: { step, substep },
      });
      window.scrollTo(0, 0);
    }
  }
};

export default EnqueteService;
