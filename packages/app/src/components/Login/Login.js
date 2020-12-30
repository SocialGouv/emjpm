import { useFormik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React from "react";
import { useApolloClient } from "react-apollo";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { Link } from "~/components/Commons";
import { loginSchema } from "~/lib/validationSchemas";
import { matopush } from "~/matomo";
import { Button, Card, Field, Heading4, InlineError, Input, Text } from "~/ui";
import { login } from "~/util/auth";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const checkStatus = async (
  apolloClient,
  response,
  setSubmitting,
  setStatus
) => {
  let json = null;
  setSubmitting(false);
  try {
    json = await response.json();
  } catch (errors) {
    setStatus({ errorMsg: errors.msg });
  }
  if (!response.ok) {
    matopush(["trackEvent", "login", "error"]);
    setStatus({ errorMsg: json.errors.msg });
    return json;
  }

  apolloClient.clearStore();
  login(json);
  Router.push(json.url);

  return json;
};

const Login = (props) => {
  const { token } = props;
  const url = `${API_URL}/api/auth/login`;

  const apolloClient = useApolloClient();

  const handleSubmit = async (values, setSubmitting, setStatus) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        password: values.password,
        username: values.username,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    checkStatus(apolloClient, response, setSubmitting, setStatus);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus, token);
    },
    validationSchema: loginSchema,
  });

  return (
    <Card mt="5" p="0">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading4 mb="1">{`Connectez-vous à votre compte.`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Indiquez votre email et votre mot de passe pour vous connecter.`}
          </Text>
        </Box>
      </Box>
      <Box p="5">
        <form onSubmit={formik.handleSubmit}>
          {!!formik.status && (
            <Box color="error" mb="1">
              {formik.status.errorMsg}
            </Box>
          )}
          <Field>
            <Input
              value={formik.values.username}
              id="username"
              name="username"
              type="text"
              hasError={formik.errors.username && formik.touched.username}
              onChange={formik.handleChange}
              placeholder="Votre nom d'utilisateur"
            />
            {formik.touched.username && (
              <InlineError
                message={formik.errors.username}
                fieldId="username"
              />
            )}
          </Field>
          <Field>
            <Input
              value={formik.values.password}
              id="password"
              name="password"
              type="password"
              hasError={formik.errors.password && formik.touched.password}
              onChange={formik.handleChange}
              placeholder="Votre mot de passe"
            />
            {formik.touched.password && (
              <InlineError
                message={formik.errors.password}
                fieldId="password"
              />
            )}
          </Field>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                Se connecter
              </Button>
            </Box>
          </Flex>
          <Box my="2">
            <Link href="/account/forgot-password">{`J'ai oublié mon mot de passe et / ou mon identifiant`}</Link>
          </Box>
          <Box>
            <Link href="mailto:support.emjpm@fabrique.social.gouv.fr">{`Contactez-nous en cas de difficulté de connexion`}</Link>
          </Box>
        </form>
      </Box>
    </Card>
  );
};

export { Login };
