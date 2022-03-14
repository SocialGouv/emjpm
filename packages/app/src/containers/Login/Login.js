import { useState } from "react";
import { useFormik } from "formik";

import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { Link } from "~/containers/Commons";
import config from "~/config";
import { loginSchema } from "~/validation-schemas";
import {
  Button,
  Card,
  Field,
  Heading,
  InlineError,
  Input,
  SrOnly,
  Text,
} from "~/components";
import { useAuth } from "~/user/Auth";
import { matopush } from "~/user/matomo";

const { API_URL } = config;

const checkStatus = async (
  apolloClient,
  response,
  setSubmitting,
  setStatus,
  history,
  login
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
  history.push(json.url);

  return json;
};

function Login(props) {
  const { token } = props;
  const url = `${API_URL}/api/auth/login`;

  const history = useHistory();
  const { login } = useAuth();
  const apolloClient = useApolloClient();
  const [formikSubmitted, setFormikSubmitted] = useState(false);

  const handleSubmit = async (values, setSubmitting, setStatus) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        password: values.password,
        email: values.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    checkStatus(
      apolloClient,
      response,
      setSubmitting,
      setStatus,
      history,
      login
    );
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus, token);
    },
    validationSchema: loginSchema,
  });

  const onSubmit = (e) => {
    setFormikSubmitted(true);
    return formik.handleSubmit(e);
  };

  return (
    <Card mt="5" p="0" id="login_box">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading size={4} mb="1" id="login_heading">
            {"Connectez-vous à votre compte."}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Indiquez votre email et votre mot de passe pour vous connecter."}
          </Text>
        </Box>
      </Box>
      <Box p="5" role="group" aria-labelledby="login_heading">
        <form noValidate onSubmit={onSubmit}>
          <SrOnly>
            <SrOnly id="instructions">
              {"Tous les champs marqués d'un astérisque * sont obligatoires"}
            </SrOnly>
            <Text id="instructions" lineHeight="1.5" color="textSecondary">
              {"Tous les champs marqués d'un astérisque * sont obligatoires"}
            </Text>
          </SrOnly>
          {!!formik.status && (
            <Box color="error" mb="1" role="alert">
              {formik.status.errorMsg}
            </Box>
          )}
          <Field>
            <Input
              value={formik.values.email}
              id="email"
              name="email"
              type="text"
              hasError={!!formik.errors.email}
              onChange={formik.handleChange}
              placeholder="Votre email"
              required
              aria-describedby="msg-email"
              autoComplete="email"
              aria-label="Votre email"
            />

            <div id="msg-email">
              <InlineError message={formik.errors.email} fieldId="email" />
            </div>
          </Field>
          <Field>
            <Input
              value={formik.values.password}
              id="password"
              name="password"
              type="password"
              hasError={
                formik.errors.password &&
                (formik.dirty.password || formikSubmitted)
              }
              onChange={formik.handleChange}
              onBlur={() => {
                formik.setFieldTouched("password");
              }}
              placeholder="Votre mot de passe"
              required
              aria-describedby="msg-password"
              autoComplete="current-password"
              aria-label="Votre mot de passe"
            />
            <div id="msg-password">
              {(formik.touched.password || formikSubmitted) && (
                <InlineError
                  message={formik.errors.password}
                  fieldId="password"
                />
              )}
            </div>
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
            <Link to="/account/forgot-password">
              {"J'ai oublié mon mot de passe"}
            </Link>
          </Box>
          <Box>
            <Link to={`mailto:${config.EMAIL_SUPPORT}`}>
              {"Contactez-nous en cas de difficulté de connexion"}
            </Link>
          </Box>
        </form>
      </Box>
    </Card>
  );
}

export { Login };
