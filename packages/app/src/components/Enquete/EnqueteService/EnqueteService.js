import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Box, Flex } from "rebass";

import { EnqueteMenuStepper } from "../EnqueteCommon/EnqueteMenuStepper";
import { EnqueteConfirmExitInvalidFormDialog } from "../EnqueteConfirmExitInvalidFormDialog";
import { useEnqueteContext } from "../useEnqueteContext.hook";
import { enqueteServiceMenuBuilder } from "./EnqueteServiceMenuBuilder.service";

export const EnqueteService = (props) => {
  const router = useRouter();
  const { userId, enquete, enqueteReponse, currentStep } = props;

  const sections = useMemo(() => enqueteServiceMenuBuilder.buildMenuSections(enqueteReponse), [
    enqueteReponse,
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
    enqueteReponse,
  });

  console.log("xxx section:", section);
  console.log("xxx step:", step);

  if (step === undefined || section === undefined) {
    navigateToStep({ step: 0, substep: 0 });
    return <Box mt={4}>Redirection...</Box>;
  }
  const ComponentForm = step.component;

  return (
    <Flex>
      <Box>
        <EnqueteMenuStepper
          readOnly={enqueteReponse.status !== "draft"}
          sections={sections}
          currentStep={currentStep}
          onClickLink={(x) => saveAndNavigate(x)}
        />
      </Box>
      <Box py={"50px"} px={"35px"} flex={1}>
        <ComponentForm
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          enqueteContext={{
            ...enqueteContext,
            enqueteReponse,
            userId,
            section,
            step,
          }}
          userId={userId}
          section={section}
          step={step}
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
    console.log(
      `xxx Redirect ${step} ${substep}`,
      currentStep,
      step !== currentStep.step || substep !== currentStep.substep
    );
    if (step !== currentStep.step || substep !== currentStep.substep) {
      await router.push("/services/enquetes/[enquete_id]", {
        pathname: `/services/enquetes/${enquete.id}`,
        query: { step, substep },
      });
      window.scrollTo(0, 0);
    }
  }
};

export default EnqueteService;
