import { Field, Heading1, Heading3 } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { SmallInput } from "../../Commons/SmallInput";
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
    aah: data.aah || "",
    pch: data.pch || "",
    asi: data.asi || "",
    rsa: data.rsa || "",
    als_apl: data.als_apl || "",
    aspa: data.aspa || "",
    apa: data.apa || "",
  };
}

export const EnqueteIndividuelPrestationsSocialesForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const { submitForm, handleChange, values, showError, errors, submit } = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    loading,
  });

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Prestation sociales"}
      </Heading1>
      <Heading3>Répartition des personnes</Heading3>

      <Text my={4} fontWeight="bold" color="#595959">
        SELON LA PRESTATION PRINCIPALE PERCUE
      </Text>

      <Box mt={3}>
        <Flex>
          <Box>
            <Field>
              <Label mb={1} htmlFor={"aah"}>
                {"AAH"}
              </Label>
              <SmallInput
                type="number"
                placeholder=""
                value={values.aah}
                id="aah"
                name="aah"
                hasError={showError && !!errors.aah}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label mb={1} htmlFor={"pch"}>
                {"PCH"}
              </Label>
              <SmallInput
                id="pch"
                name="pch"
                placeholder=""
                type="number"
                value={values.pch}
                onChange={handleChange}
                hasError={showError && !!errors.pch}
              />
            </Field>

            <Field>
              <Label mb={1} htmlFor={"asi"}>
                {"ASI"}
              </Label>
              <SmallInput
                id="asi"
                name="asi"
                placeholder=""
                type="number"
                value={values.asi}
                onChange={handleChange}
                hasError={showError && !!errors.asi}
              />
            </Field>

            <Field>
              <Label mb={1} htmlFor={"rsa"}>
                {"RSA de base ou majoré"}
              </Label>
              <SmallInput
                id="rsa"
                name="rsa"
                placeholder=""
                type="number"
                value={values.rsa}
                hasError={showError && !!errors.rsa}
                onChange={handleChange}
              />
            </Field>
          </Box>
          <Box>
            <Field>
              <Label mb={1} htmlFor={"als"}>
                {"ALS ou APL"}
              </Label>
              <SmallInput
                id="als_apl"
                name="als_apl"
                placeholder=""
                type="number"
                value={values.als_apl}
                hasError={showError && !!errors.als_apl}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label mb={1} htmlFor={"aspa"}>
                {"ASPA"}
              </Label>
              <SmallInput
                id="aspa"
                name="aspa"
                placeholder=""
                type="number"
                value={values.aspa}
                hasError={showError && !!errors.aspa}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label mb={1} htmlFor={"apa"}>
                {"APA"}
              </Label>
              <SmallInput
                id="apa"
                name="apa"
                placeholder=""
                type="number"
                value={values.apa}
                hasError={showError && !!errors.apa}
                onChange={handleChange}
              />
            </Field>
          </Box>
        </Flex>

        <Box mt={4}>
          <EnqueteStepperButtons submit={submit} disabled={loading} />
        </Box>
      </Box>
    </form>
  );
};

export default EnqueteIndividuelPrestationsSocialesForm;
