import { Button, Field, InlineError, Input } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Flex } from "rebass";

import { individuelExerciceSchema } from "../../lib/validationSchemas";

const IndividuelInformationExerciceForm = props => {
  const { exercice, handleSubmit } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelExerciceSchema,
    initialValues: {
      estimationEtp: exercice.estimation_etp ? exercice.estimation_etp : ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.estimation_etp}
          id="estimationEtp"
          name="estimationEtp"
          hasError={formik.errors.estimationEtp && formik.touched.estimationEtp}
          onChange={formik.handleChange}
          placeholder="Estimation de l'activité de mandataire individuel en ETP"
        />
        <InlineError message={formik.errors.estimationEtp} fieldId="estimationEtp" />
      </Field>
      <Flex>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Modifier
        </Button>
      </Flex>
    </form>
  );
};

export { IndividuelInformationExerciceForm };
