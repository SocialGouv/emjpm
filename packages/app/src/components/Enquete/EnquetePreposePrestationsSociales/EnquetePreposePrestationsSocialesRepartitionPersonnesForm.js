import { Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import yup from "~/lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat } from "~/util";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

// schema identique à prestationsSocialesStatus (côté hasura actions)
export const validationSchema = yup.object().shape({
  aah: yup.number().min(0).nullable(),
  als_apl: yup.number().min(0).nullable(),
  apa: yup.number().min(0).nullable(),
  asi: yup.number().min(0).nullable(),
  aspa: yup.number().min(0).nullable(),
  pch: yup.number().min(0).nullable(),
  rsa: yup.number().min(0).nullable(),
});

function dataToForm(data) {
  return {
    aah: formatFormInput(data.aah),
    als_apl: formatFormInput(data.als_apl),
    apa: formatFormInput(data.apa),
    asi: formatFormInput(data.asi),
    aspa: formatFormInput(data.aspa),
    pch: formatFormInput(data.pch),
    rsa: formatFormInput(data.rsa),
  };
}

function formToData(values) {
  return {
    aah: parseFormFloat(values.aah),
    als_apl: parseFormFloat(values.als_apl),
    apa: parseFormFloat(values.apa),
    asi: parseFormFloat(values.asi),
    aspa: parseFormFloat(values.aspa),
    pch: parseFormFloat(values.pch),
    rsa: parseFormFloat(values.rsa),
  };
}

export const EnquetePreposePrestationsSocialesRepartitionPersonnesForm = (
  props
) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <form onSubmit={submitForm}>
      <HeadingTitle textAlign="center" mb={"50px"}>
        {"Prestation sociales"}
      </HeadingTitle>
      <Heading3>Répartition des personnes</Heading3>

      <Text my={4} fontWeight="bold" color="#595959">
        SELON LA PRESTATION PRINCIPALE PERCUE
      </Text>

      <Box mt={3}>
        <Flex>
          <Box>
            <EnqueteFormInputField
              id="aah"
              label="AAH"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              size="small"
              type="number"
              min={0}
            />

            <EnqueteFormInputField
              id="pch"
              label="PCH"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              size="small"
              type="number"
              min={0}
            />

            <EnqueteFormInputField
              id="asi"
              label="ASI"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              size="small"
              type="number"
              min={0}
            />

            <EnqueteFormInputField
              id="rsa"
              label="RSA de base ou majoré"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              size="small"
              type="number"
              min={0}
            />
          </Box>
          <Box>
            <EnqueteFormInputField
              id="als_apl"
              label="ALS ou APL"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              size="small"
              type="number"
              min={0}
            />
            <EnqueteFormInputField
              id="aspa"
              label="ASPA"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              size="small"
              type="number"
              min={0}
            />
            <EnqueteFormInputField
              id="apa"
              label="APA"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              size="small"
              type="number"
              min={0}
            />
          </Box>
        </Flex>

        <Box mt={4}>
          <EnqueteStepperButtons submit={submit} disabled={loading} />
        </Box>
      </Box>
    </form>
  );
};

export default EnquetePreposePrestationsSocialesRepartitionPersonnesForm;
