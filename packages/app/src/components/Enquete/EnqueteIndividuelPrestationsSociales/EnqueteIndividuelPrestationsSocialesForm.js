import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

// import { mandataireEnqueteIndividuelAgrementFormationSchema } from "../../../lib/validationSchemas/mandataireEnqueteIndividuelSchema";

export const EnqueteIndividuelPrestationsSocialesForm = props => {
  const { data = {} } = props;
  const { aah, pch, asi, rsa, als, aspa, apa } = data;

  const { handleSubmit, handleChange, values, errors } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    // validationSchema: mandataireEnqueteIndividuelAgrementFormationSchema,
    initialValues: {
      aah: aah || "",
      pch: pch || "",
      asi: asi || "",
      rsa: rsa || "",
      als: als || "",
      aspa: aspa || "",
      apa: apa || ""
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Prestation sociales"}
      </Heading1>
      <Heading3>Répartition des personnes selon la prestation sociale principale perçue</Heading3>

      <Box mt={3}>
        <Field>
          <Label mb={1} htmlFor={"aah"}>
            {"AAH"}
          </Label>
          <Input
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
          <Input
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
          <Input
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
          <Input
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

        <Field>
          <Label mb={1} htmlFor={"als"}>
            {"ALS ou APL"}
          </Label>
          <Input
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
            {"ASPA ou les allocations constitutives de minimum vieillesse"}
          </Label>
          <Input
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
          <Input
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
    </form>
  );
};

export default EnqueteIndividuelPrestationsSocialesForm;
