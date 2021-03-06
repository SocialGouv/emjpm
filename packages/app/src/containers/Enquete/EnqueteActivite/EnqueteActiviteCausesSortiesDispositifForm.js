import { Box, Flex, Text } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import yup from "~/validation-schemas/yup";
import { Heading } from "~/components";
import { formatFormInput, parseFormInt } from "~/utils/form";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object({
  sortiesDeces: yup.number().min(0).integer().nullable(),
  sortiesMainLevee: yup.number().min(0).integer().nullable(),
  sortiesMasp: yup.number().min(0).integer().nullable(),
});

function dataToForm(data) {
  return {
    sortiesDeces: formatFormInput(data.sortiesDeces),
    sortiesMainLevee: formatFormInput(data.sortiesMainLevee),
    sortiesMasp: formatFormInput(data.sortiesMasp),
  };
}

function formToData(data) {
  return {
    sortiesDeces: parseFormInt(data.sortiesDeces),
    sortiesMainLevee: parseFormInt(data.sortiesMainLevee),
    sortiesMasp: parseFormInt(data.sortiesMasp),
  };
}

export function EnqueteActiviteCausesSortiesDispositifForm(props) {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    sections,
  } = props;

  const enqueteForm = useEnqueteForm({
    currentStep: props.currentStep,
    sections,
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
    sections,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <Box
      sx={{
        strong: {
          color: "primary",
        },
      }}
      as="form"
      onSubmit={submitForm}
    >
      <Box textAlign="center" mb={"50px"}>
        <HeadingTitle mb={1}>{enqueteContext.section.label}</HeadingTitle>
        <Text
          sx={{
            color: "titleSecondary",
            fontWeight: "bold",
          }}
        >
          Les données à remplir ci-dessous sont celles au <strong>31/12</strong>
        </Text>
      </Box>

      <Heading size={3}>Causes de sorties du dispositif</Heading>

      <Flex mt={4}>
        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="sortiesMainLevee"
            label="Main levées"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>

        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="sortiesDeces"
            label="Décès"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>
      </Flex>
      <Flex mt={4}>
        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="sortiesMasp"
            label="MASP"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>

        <Flex flex={1 / 2} />
      </Flex>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </Box>
  );
}

export default EnqueteActiviteCausesSortiesDispositifForm;
