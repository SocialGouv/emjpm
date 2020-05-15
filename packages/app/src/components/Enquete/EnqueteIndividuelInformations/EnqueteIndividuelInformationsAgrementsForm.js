import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnqueteIndividuelInformationsAgrementsForm = props => {
  const { data = {}, goToPrevPage } = props;

  const { annee_agrement = "", nb_departements = "" } = data;

  const { handleSubmit, handleChange, values, errors } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: {
      annee_agrement,
      nb_departements
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>{"Agréments"}</Heading3>

      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor={"annee_agrement"}>
            {"Année d'obtention de votre agrément"}
          </Label>
          <Input
            type="number"
            placeholder=""
            value={values.annee_agrement}
            id="annee_agrement"
            name="annee_agrement"
            hasError={!!errors.annee_agrement}
            onChange={handleChange}
          />
          <InlineError message={errors.annee_agrement} fieldId="annee_agrement" />
        </Field>

        <Field>
          <Label mb={1} htmlFor="nb_departements">
            {"Nombre de départements dans lesquels vous disposez d'un agrément"}
          </Label>
          <Input
            type="number"
            placeholder=""
            value={values.nb_departements}
            id="nb_departements"
            name="nb_departements"
            hasError={!!errors.nb_departements}
            onChange={handleChange}
          />
          <InlineError message={errors.nb_departements} fieldId="nb_departements" />
        </Field>
        <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsAgrementsForm;
