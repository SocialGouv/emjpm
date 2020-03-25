import { Button, Field, InlineError, Input } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { individuelExerciceSchema } from "../../lib/validationSchemas";

const IndividuelInformationExerciceForm = props => {
  const { exercice, handleSubmit } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelExerciceSchema,
    initialValues: {
      estimation_etp: exercice.estimation_etp ? exercice.estimation_etp : ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Flex>
          <Box width={["100%", "50%"]}>
            {`Estimation de l'activité de mandataire individuel en ETP`}
          </Box>
          <Box width={["100%", "50%"]}>
            <Input
              value={formik.values.estimation_etp}
              id="estimation_etp"
              name="estimation_etp"
              hasError={formik.errors.estimation_etp && formik.touched.estimation_etp}
              onChange={formik.handleChange}
              placeholder="Estimation de l'activité de mandataire individuel en ETP"
            />
            {formik.touched.estimation_etp && (
              <InlineError message={formik.errors.estimation_etp} fieldId="estimation_etp" />
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

export { IndividuelInformationExerciceForm };
