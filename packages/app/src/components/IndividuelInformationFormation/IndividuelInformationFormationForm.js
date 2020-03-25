import { Button, Field, InlineError, Input } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Flex } from "rebass";

import { individuelFormationSchema } from "../../lib/validationSchemas";

const IndividuelInformationFormationForm = props => {
  const { formation, handleSubmit } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelFormationSchema,
    initialValues: {
      cncMjpmAnneeObtention: formation.cnc_mjpm_annee_obtention || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.cncMjpmAnneeObtention}
          id="cncMjpmAnneeObtention"
          name="cncMjpmAnneeObtention"
          hasError={formik.errors.cncMjpmAnneeObtention && formik.touched.cncMjpmAnneeObtention}
          onChange={formik.handleChange}
          placeholder="Estimation de l'activité de mandataire individuel en ETP"
        />
        <InlineError
          message={formik.errors.cncMjpmAnneeObtention}
          fieldId="cnc_mjpm_annee_obtention"
        />
      </Field>
      <Flex>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Modifier
        </Button>
      </Flex>
    </form>
  );
};

export { IndividuelInformationFormationForm };
