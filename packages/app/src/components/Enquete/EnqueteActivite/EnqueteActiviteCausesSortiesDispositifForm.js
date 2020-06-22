import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormInt } from "../../../util";
import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object({
  sortiesMainLevee: yup.number().min(0).integer().nullable(),
  sortiesDeces: yup.number().min(0).integer().nullable(),
  sortiesMasp: yup.number().min(0).integer().nullable(),
});

function dataToForm(data) {
  return {
    sortiesMainLevee: formatFormInput(data.sortiesMainLevee),
    sortiesDeces: formatFormInput(data.sortiesDeces),
    sortiesMasp: formatFormInput(data.sortiesMasp),
  };
}

function formToData(data) {
  return {
    sortiesMainLevee: parseFormInt(data.sortiesMainLevee),
    sortiesDeces: parseFormInt(data.sortiesDeces),
    sortiesMasp: parseFormInt(data.sortiesMasp),
  };
}

export const EnqueteActiviteCausesSortiesDispositifForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    formToData,
    loading,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <Box>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Votre activité"}
        </Heading1>

        <Heading3>Causes de sorties du dispositif</Heading3>

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
      </form>
    </Box>
  );
};

export default EnqueteActiviteCausesSortiesDispositifForm;
