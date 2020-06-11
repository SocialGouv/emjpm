import { Field, Heading1, Heading3, InlineError } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { SmallInput } from "../../Commons/SmallInput";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

// schema identique à prestationsSocialesStatus (côté hasura actions)
export const enquetePrestationsSocialesSchema = yup.object().shape({
  aah: yup
    .number()
    .min(0)
    .nullable(),
  als_apl: yup
    .number()
    .min(0)
    .nullable(),
  apa: yup
    .number()
    .min(0)
    .nullable(),
  asi: yup
    .number()
    .min(0)
    .nullable(),
  aspa: yup
    .number()
    .min(0)
    .nullable(),
  pch: yup
    .number()
    .min(0)
    .nullable(),
  rsa: yup
    .number()
    .min(0)
    .nullable()
});
function mapDataPropsToFormValues(data) {
  return {
    aah: data.aah || "",
    pch: data.pch || "",
    asi: data.asi || "",
    rsa: data.rsa || "",
    als_apl: data.als_apl || "",
    aspa: data.aspa || "",
    apa: data.apa || ""
  };
}

export const EnquetePreposePrestationsSocialesRepartitionPersonnesForm = props => {
  const { data = {}, step, goToPrevPage, loading = false } = props;

  const { handleSubmit, submitCount, handleChange, values, errors, setValues } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: mapDataPropsToFormValues(data),
    validationSchema: enquetePrestationsSocialesSchema
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  const showError = useMemo(() => step.status !== "empty" || submitCount !== 0, [
    step.status,
    submitCount
  ]);

  console.log("showError", showError);

  return (
    <form onSubmit={handleSubmit}>
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
                min={0}
              />
              {showError && <InlineError message={errors.aah} fieldId={"aah"} />}
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
                min={0}
              />
              {showError && <InlineError message={errors.pch} fieldId={"pch"} />}
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
                min={0}
              />
              {showError && <InlineError message={errors.asi} fieldId={"asi"} />}
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
                min={0}
              />
              {showError && <InlineError message={errors.rsa} fieldId={"rsa"} />}
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
                min={0}
              />
              {showError && <InlineError message={errors.als_apl} fieldId={"als_apl"} />}
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
                min={0}
              />
              {showError && <InlineError message={errors.aspa} fieldId={"aspa"} />}
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
                min={0}
              />
              {showError && <InlineError message={errors.apa} fieldId={"apa"} />}
            </Field>
          </Box>
        </Flex>

        <Box mt={4}>
          <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
        </Box>
      </Box>
    </form>
  );
};

export default EnquetePreposePrestationsSocialesRepartitionPersonnesForm;
