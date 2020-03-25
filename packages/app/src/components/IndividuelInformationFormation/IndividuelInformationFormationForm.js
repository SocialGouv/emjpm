import { Button, Field, InlineError, Input } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { individuelFormationSchema } from "../../lib/validationSchemas";

const IndividuelInformationFormationForm = props => {
  const { formation, handleSubmit } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelFormationSchema,
    initialValues: {
      cnc_mjpm_annee_obtention: formation.cnc_mjpm_annee_obtention
        ? formation.cnc_mjpm_annee_obtention
        : ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Flex>
          <Box width={["100%", "50%"]}>{`Année d'obtention du CNC MJPM`}</Box>
          <Box width={["100%", "50%"]}>
            <Input
              value={formik.values.cnc_mjpm_annee_obtention}
              id="cnc_mjpm_annee_obtention"
              name="cnc_mjpm_annee_obtention"
              hasError={
                formik.errors.cnc_mjpm_annee_obtention && formik.touched.cnc_mjpm_annee_obtention
              }
              onChange={formik.handleChange}
              placeholder="Estimation de l'activité de mandataire individuel en ETP"
            />
            {formik.touched.cnc_mjpm_annee_obtention && (
              <InlineError
                message={formik.errors.cnc_mjpm_annee_obtention}
                fieldId="cnc_mjpm_annee_obtention"
              />
            )}
          </Box>
        </Flex>
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
