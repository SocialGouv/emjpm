import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useState } from "react";
import { Box, Flex } from "rebass";

import { editorTokenSchema } from "~/lib/validationSchemas";
import { Button, Card, Field, Heading4, InlineError, Input, Text } from "~/ui";

import { EDITOR_TOKEN_REQUEST, SEND_EMAIL_TOKEN_REQUEST } from "./mutations";

const TokenRequest = () => {
  const [editorTokenRequest] = useMutation(EDITOR_TOKEN_REQUEST);
  const [sendEmailTokenRequest] = useMutation(SEND_EMAIL_TOKEN_REQUEST);
  const [isMessageVisible, toggleMessage] = useState(false);
  const [isErrorMessageVisible, toggleErrorMessage] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { email, name } = values;

      try {
        await editorTokenRequest({
          variables: { email, name },
        });

        await sendEmailTokenRequest({
          variables: { email, name },
        });

        toggleMessage(true);
        resetForm();
      } catch {
        toggleErrorMessage(true);
      }
      setSubmitting(false);
    },
    validationSchema: editorTokenSchema,
  });

  return (
    <Card mt="5" p="0">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading4 mb="1">{"Demande d'accès à l'api métier Emjpm."}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {"Indiquez le nom de votre logiciel métier et votre email."}
          </Text>
          {isMessageVisible && (
            <Box
              sx={{
                bg: "success",
                borderRadius: 3,
                color: "white",
                lineHeight: "1.5",
                mt: "1",
                p: "1",
              }}
            >
              {"Votre demande a bien été prise en compte"}
            </Box>
          )}
          {isErrorMessageVisible && (
            <Box
              sx={{
                bg: "error",
                borderRadius: 3,
                color: "white",
                lineHeight: "1.5",
                mt: "1",
                p: "1",
              }}
            >
              {"Un problème est survenu, merci de ressayer"}
            </Box>
          )}
        </Box>
      </Box>
      <Box p="5">
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Input
              value={formik.values.name}
              id="name"
              name="name"
              type="text"
              hasError={formik.errors.name && formik.touched.name}
              onChange={formik.handleChange}
              placeholder="Le nom de votre logiciel métier"
            />
            {formik.touched.name && (
              <InlineError message={formik.errors.name} fieldId="name" />
            )}
          </Field>
          <Field>
            <Input
              value={formik.values.email}
              id="email"
              name="email"
              type="text"
              hasError={formik.errors.email && formik.touched.email}
              onChange={formik.handleChange}
              placeholder="Votre email"
            />
            {formik.touched.email && (
              <InlineError message={formik.errors.email} fieldId="email" />
            )}
          </Field>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                {"Demander une autorisation d'accès"}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Card>
  );
};

export { TokenRequest };
