import { useMemo } from "react";
import { Box, Flex } from "rebass";

import { EnqueteMenuStepper } from "../EnqueteCommon/EnqueteMenuStepper";
import { EnqueteConfirmExitInvalidFormDialog } from "../EnqueteConfirmExitInvalidFormDialog";
import { useEnqueteContext } from "../useEnqueteContext.hook";
import { enqueteIndividuelMenuBuilder } from "./enqueteIndividuelMenuBuilder.service";

export const EnqueteIndividuel = (props) => {
  const { enquete, enqueteReponse, currentStep, navigateToStep } = props;

  const sections = useMemo(
    () => enqueteIndividuelMenuBuilder.buildMenuSections(enqueteReponse),
    [enqueteReponse]
  );

  const {
    section,
    step,
    enqueteContext,
    dispatchEnqueteContextEvent,
    saveAndNavigate,
    confirmExitInvalidFormDialog,
  } = useEnqueteContext({
    currentStep,
    enqueteReponse,
    navigateToStep,
    sections,
  });

  if (step === undefined || section === undefined) {
    navigateToStep({ step: 0, substep: 0 });
    return <Box mt={4}>Redirection...</Box>;
  }
  const ComponentForm = step.component;

  return (
    <Flex>
      <Box bg="#DBE7F6">
        <EnqueteMenuStepper
          readOnly={enqueteReponse.status !== "draft"}
          sections={sections}
          currentStep={currentStep}
          onClickLink={(x) => saveAndNavigate(x)}
        />
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <ComponentForm
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          section={section}
          step={step}
          enqueteContext={{
            ...enqueteContext,
            enqueteReponse,
            section,
            step,
          }}
          dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
          goToFirstPage={() => navigateToStep({ step: 1, substep: 0 })}
        />
        <EnqueteConfirmExitInvalidFormDialog
          {...confirmExitInvalidFormDialog}
        />
      </Box>
    </Flex>
  );
};

export default EnqueteIndividuel;
