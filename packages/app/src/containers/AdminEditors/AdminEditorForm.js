import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import { adminEditorSchema } from "~/validation-schemas";
import { Button, Field, Heading, InlineError, Input, Text } from "~/components";

export function AdminEditorForm(props) {
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
          <Heading size={4} id="informations_editeur">
            {"Information de l'éditeur"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Informations relatives à l'éditeur"}
          </Text>
        </Box>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="2" role="group" aria-labelledby="informations_editeur">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Field>
              <Input
                value={formik.values.name}
                id="name"
                name="name"
                hasError={formik.errors.name && formik.touched.name}
                onChange={formik.handleChange}
                placeholder="Nom du service"
                aria-describedby="msg-name"
                autoComplete="organization"
              />
              <div id="msg-name">
                <InlineError message={formik.errors.name} fieldId="name" />
              </div>
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
                aria-describedby="msg-redirect_uris"
                autoComplete="url"
              />
              <div id="msg-redirect_uris">
                <InlineError
                  message={formik.errors.redirect_uris}
                  fieldId="redirect_uris"
                />
              </div>
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
}
