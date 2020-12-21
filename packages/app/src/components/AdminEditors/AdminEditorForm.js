import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { adminEditorSchema } from "~/lib/validationSchemas";
import { Button, Field, Heading4, InlineError, Input, Text } from "~/ui";

export const AdminEditorForm = (props) => {
  const { handleCancel, handleSubmit, editor } = props;

  const formik = useFormik({
    initialValues: {
      name: editor ? editor.name : "",
      redirect_uris: editor ? editor.redirect_uris : "",
    },
    onSubmit: handleSubmit,
    validationSchema: adminEditorSchema,
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
            <Field>
              <Input
                value={formik.values.redirect_uris}
                id="redirect_uris"
                name="redirect_uris"
                hasError={
                  formik.errors.redirect_uris && formik.touched.redirect_uris
                }
                onChange={formik.handleChange}
                placeholder="URI de redirection"
              />
              <InlineError
                message={formik.errors.redirect_uris}
                fieldId="redirect_uris"
              />
            </Field>
            <Flex justifyContent="flex-end">
              {handleCancel && (
                <Box>
                  <Button
                    type="button"
                    mr="2"
                    variant="outline"
                    onClick={handleCancel}
                  >
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
