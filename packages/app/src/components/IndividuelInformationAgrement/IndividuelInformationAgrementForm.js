import { Button, Field, InlineError, Input } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { individuelAgrementSchema } from "../../lib/validationSchemas";

const IndividuelInformationAgrementForm = props => {
  const { agrement, handleSubmit } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelAgrementSchema,
    initialValues: {
      debutAactiviteAvant2009: agrement.debut_activite_avant_2009 || "",
      anneeDebutActivite: agrement.annee_debut_activite || "",
      anneeAgrement: agrement.annee_agrement || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Flex>
          <Box width={["100%", "50%"]}>
            {`L'activité du mandataire individuel a-t-elle débuté avant 2009?`}
          </Box>
          <Box width={["100%", "50%"]}>
            <Input
              value={formik.values.debut_activite_avant_2009}
              type="debut_activite_avant_2009"
              id="debut_activite_avant_2009"
              name="debut_activite_avant_2009"
              hasError={
                formik.errors.debut_activite_avant_2009 && formik.touched.debut_activite_avant_2009
              }
              onChange={formik.handleChange}
              placeholder="Début d'activité avant 2009"
            />
            {formik.touched.debut_activite_avant_2009 && (
              <InlineError
                message={formik.errors.debut_activite_avant_2009}
                fieldId="debut_activite_avant_2009"
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

export { IndividuelInformationAgrementForm };
