import { Button, Card, Field, Heading4, InlineError, Input, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React from "react";
import ReactPiwik from "react-piwik";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { loginSchema } from "../../lib/validationSchemas";
import { trackUser } from "../../piwik";
import { login } from "../../util/auth";
import { Link } from "../Commons";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const checkStatus = async (response, setSubmitting, setStatus) => {
  let json = null;
  setSubmitting(false);
  try {
    json = await response.json();
  } catch (errors) {
    setStatus({ errorMsg: errors.msg });
  }
  if (!response.ok) {
    ReactPiwik.push(["trackEvent", "login", "error"]);
    setStatus({ errorMsg: json.errors.msg });
    return json;
  }

  login({ token: json.token });
  Router.push(json.url);
  ReactPiwik.push(["trackEvent", "login", "success"]);
  trackUser();
  // TODO remove that hack when mandataire is all done
  if (json.url === "/mandataires") {
    document.location.reload(true);
  }
  return json;
};

const Login = props => {
  const { token } = props;
  const url = `${API_URL}/api/v2/auth/login`;

  const handleSubmit = async (values, setSubmitting, setStatus) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        password: values.password,
        username: values.username
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    checkStatus(response, setSubmitting, setStatus);
  };

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus, token);
    },
    validationSchema: loginSchema,
    initialValues: {
      password: "",
      username: ""
    }
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
              <InlineError message={formik.errors.username} fieldId="username" />
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
              <InlineError message={formik.errors.password} fieldId="password" />
            )}
          </Field>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
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
