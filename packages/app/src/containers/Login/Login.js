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
import { FormGroupInput } from "~/components/AppForm";
import { useAuth } from "~/user/Auth";
import { matopush } from "~/user/matomo";

const { API_URL } = config;

function Login() {
  const history = useHistory();
  const { login } = useAuth();
  const apolloClient = useApolloClient();

  let handleSubmit;

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        await handleSubmit(values);
      } catch (e) {
        console.error(e);
      } finally {
        formik.setSubmitting(false);
      }
    },
    validationSchema: loginSchema,
  });

  const [authEnabled2FA, setAuthEnabled2FA] = useState(null);

  const handleLogin = (data) => {
    apolloClient.clearStore();
    login(data);
    history.push(data.url);
  };

  handleSubmit = async (values) => {
    const url = `${API_URL}/api/auth/login`;
    const variables = {
      password: values.password,
      email: values.email,
    };
    if (values.code_2fa) {
      variables.code_2fa = values.code_2fa;
    }
    const response = await fetch(url, {
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    let json = null;
    try {
      json = await response.json();
    } catch (errors) {
      formik.setStatus({ errorMsg: errors.msg });
    }
    if (!response.ok) {
      matopush(["trackEvent", "login", "error"]);
      formik.setStatus({ errorMsg: json.errors.msg });
      return json;
    }

    if (json.authEnabled2FA) {
      if (json.invalid) {
        formik.setFieldError("code_2fa", "Code non valide");
      } else {
        setAuthEnabled2FA(true);
        formik.setFieldValue("authEnabled2FA", true);
      }
      return;
    }
    handleLogin(json);
  };

  const onSubmit = (e) => {
    formik.setSubmitting(true);
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
              autoComplete="email"
              ariaLabel="Votre email"
              aria-describedby={
                formik.errors.email && formik.touched.email
                  ? "msg-email"
                  : "email_format_attendu"
              }
            />
            <SrOnly id="email_format_attendu">
              format attendu : nom@justice.fr
            </SrOnly>

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
                (formik.dirty.password || formik.submitCount > 0)
              }
              onChange={formik.handleChange}
              onBlur={() => {
                formik.setFieldTouched("password");
              }}
              placeholder="Votre mot de passe"
              required
              aria-describedby="msg-password"
              autoComplete="current-password"
              ariaLabel="Votre mot de passe"
            />
            <div id="msg-password">
              {(formik.touched.password || formik.submitCount > 0) && (
                <InlineError
                  message={formik.errors.password}
                  fieldId="password"
                />
              )}
            </div>
          </Field>
          {authEnabled2FA && (
            <Box>
              <FormGroupInput
                formik={formik}
                id="code_2fa"
                placeholder="Code"
                label="Entrez le code de votre application 2FA"
                validationSchema={loginSchema}
                aria-label={"Entrez le code de votre application 2FA"}
                hideErrors={
                  !(
                    formik.errors.code_2fa &&
                    (formik.touched.code_2fa || formik.submitCount > 1)
                  )
                }
                required
                onInput={(e) => {
                  let value = e.target.value || "";
                  value = value.replace(/\s/g, "");
                  formik.setFieldValue("code_2fa", value);
                }}
              />
            </Box>
          )}
          <Flex alignItems="center" justifyContent="flex-end">
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
                title="Se connecter"
                aria-label="Se connecter"
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
