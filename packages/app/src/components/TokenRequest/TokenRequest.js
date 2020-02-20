import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Field, Heading4, InlineError, Input, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { editorTokenSchema } from "../../lib/validationSchemas";
import { EDITOR_TOKEN_REQUEST } from "./mutations";

const TokenRequest = () => {
  const [EditorTokenRequest] = useMutation(EDITOR_TOKEN_REQUEST);

  const formik = useFormik({
    onSubmit: (values, { setSubmitting }) => {
      EditorTokenRequest({
        variables: {
          email: values.email,
          name: values.name
        }
      });
      setSubmitting(false);
    },
    validationSchema: editorTokenSchema,
    initialValues: {
      name: "",
      email: ""
    }
  });

  return (
    <Card mt="5" p="0">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading4 mb="1">{`Demande d'accès à l'api métier Emjpm.`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Indiquez le nom de votre logiciel métier et votre email.`}
          </Text>
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
            {formik.touched.name && <InlineError message={formik.errors.name} fieldId="name" />}
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
            {formik.touched.email && <InlineError message={formik.errors.email} fieldId="email" />}
          </Field>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                {`Demander une autorisation d'accès`}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Card>
  );
};

export { TokenRequest };
