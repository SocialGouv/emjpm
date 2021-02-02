import { useMemo } from "react";
import { Box, Flex } from "rebass";

import { EnqueteMenuStepper } from "../EnqueteCommon/EnqueteMenuStepper";
import { EnqueteConfirmExitInvalidFormDialog } from "../EnqueteConfirmExitInvalidFormDialog";
import { useEnqueteContext } from "../useEnqueteContext.hook";
import { enquetePreposeMenuBuilder } from "./enquetePreposeMenuBuilder.service";

export function EnquetePrepose(props) {
  const { enquete, enqueteReponse, currentStep, navigateToStep } = props;

  const sections = useMemo(
    () => enquetePreposeMenuBuilder.buildMenuSections(enqueteReponse),
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

  useEffect(() => {
    if (step === undefined || section === undefined) {
      navigateToStep({ step: 0, substep: 0 });
    }
  }, [step, section, navigateToStep]);

  if (step === undefined || section === undefined) {
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
            section,
            step,
          }}
          sections={sections}
          currentStep={currentStep}
          section={section}
          currentStep={props.currentStep}
          step={step}
          dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
          goToFirstPage={() => navigateToStep({ step: 1, substep: 0 })}
        />
        <EnqueteConfirmExitInvalidFormDialog
          {...confirmExitInvalidFormDialog}
        />
      </Box>
    </Flex>
  );
}

export default EnquetePrepose;
