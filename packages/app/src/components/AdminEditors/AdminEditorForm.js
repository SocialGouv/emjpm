import { Button, Field, Heading4, InlineError, Input, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { adminEditorSchema } from "../../lib/validationSchemas";

export const AdminEditorForm = props => {
  const { handleCancel, handleSubmit, editor } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: adminEditorSchema,
    initialValues: {
      name: editor ? editor.name : ""
    }
  });

  return (
    <Flex flexWrap="wrap">
      <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
        <Box height="230px">
          <Heading4>{`Information de l'éditeur`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Informations relatives à l'éditeur`}
          </Text>
        </Box>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="2">
          <form onSubmit={formik.handleSubmit}>
            <Field>
              <Input
                value={formik.values.name}
                id="name"
                name="name"
                hasError={formik.errors.name && formik.touched.name}
                onChange={formik.handleChange}
                placeholder="Nom du service"
              />
              <InlineError message={formik.errors.name} fieldId="name" />
            </Field>
            <Flex justifyContent="flex-end">
              {handleCancel && (
                <Box>
                  <Button type="button" mr="2" variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                </Box>
              )}
              <Box>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  isLoading={formik.isSubmitting}
                >
                  Enregistrer
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
