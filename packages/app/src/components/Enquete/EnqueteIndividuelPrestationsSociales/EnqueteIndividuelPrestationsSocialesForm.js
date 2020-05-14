import { Field, Heading1, Heading3, InlineError } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { SmallInput } from "../../Commons/SmallInput";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnqueteIndividuelPrestationsSocialesForm = props => {
  const { data = {}, goToPrevPage } = props;
  const { ps_aah, ps_pch, ps_asi, ps_rsa, ps_als_apl, ps_aspa, ps_apa } = data;

  const { handleSubmit, handleChange, values, errors } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: {
      aah: ps_aah || "",
      pch: ps_pch || "",
      asi: ps_asi || "",
      rsa: ps_rsa || "",
      als: ps_als_apl || "",
      aspa: ps_aspa || "",
      apa: ps_apa || ""
    }
  });

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
                hasError={!!errors.aah}
                onChange={handleChange}
              />
              <InlineError message={errors.aah} fieldId="aah" />
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
                hasError={!!errors.pch}
              />
              <InlineError message={errors.pch} fieldId="pch" />
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
                hasError={!!errors.asi}
              />
              <InlineError message={errors.asi} fieldId="asi" />
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
                hasError={!!errors.rsa}
                onChange={handleChange}
              />
              <InlineError message={errors.rsa} fieldId="rsa" />
            </Field>
          </Box>
          <Box>
            <Field>
              <Label mb={1} htmlFor={"als"}>
                {"ALS ou APL"}
              </Label>
              <SmallInput
                id="als"
                name="als"
                placeholder=""
                type="number"
                value={values.rsa}
                hasError={!!errors.rsa}
                onChange={handleChange}
              />
              <InlineError message={errors.als} fieldId="als" />
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
                hasError={!!errors.aspa}
                onChange={handleChange}
              />
              <InlineError message={errors.aspa} fieldId="aspa" />
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
                hasError={!!errors.apa}
                onChange={handleChange}
              />
              <InlineError message={errors.apa} fieldId="apa" />
            </Field>
          </Box>
        </Flex>

        <Box mt={4}>
          <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
        </Box>
      </Box>
    </form>
  );
};

export default EnqueteIndividuelPrestationsSocialesForm;
