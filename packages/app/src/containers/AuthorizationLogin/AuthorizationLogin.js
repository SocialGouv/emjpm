import { useFormik } from "formik";

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
  Text,
  SrOnly,
} from "~/components";
import { useAuth } from "~/user/Auth";
import { matopush } from "~/user/matomo";

const { API_URL } = config;

const checkStatus = async (
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
  login(json);
  return json;
};

function AuthorizationLogin() {
  const url = `${API_URL}/api/auth/login`;

  const history = useHistory();
  const { login } = useAuth();

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
    checkStatus(response, setSubmitting, setStatus, history, login);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus);
    },
    validationSchema: loginSchema,
  });

  return (
    <Card mt="5" p="0">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading size={4} mb="1" id="authlogin">
            {"Connectez-vous à votre compte."}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Indiquez votre email et votre mot de passe pour vous connecter."}
          </Text>
        </Box>
      </Box>
      <Box p="5" role="group" aria-labelledby="authlogin">
        <form noValidate onSubmit={formik.handleSubmit}>
          <SrOnly id="instructions">
            {"Tous les champs marqués d'un astérisque * sont obligatoires"}
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
              hasError={formik.errors.email && formik.touched.email}
              onChange={formik.handleChange}
              placeholder="Votre nom d'utilisateur"
              outline="default"
              aria-describedby={
                formik.errors.email && formik.touched.email
                  ? "msg-email"
                  : "email_format_attendu"
              }
              autoComplete="email"
            />
            <SrOnly id="email_format_attendu">
              format attendu : nom@justice.fr{" "}
            </SrOnly>
            <div id="msg-email">
              {formik.touched.email && (
                <InlineError
                  message={formik.errors.email}
                  fieldId="email"
                  aria-live="polite"
                />
              )}
            </div>
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
              outline="default"
              aria-describedby="msg-password"
              aria-label="Votre mot de passe"
            />
            <div id="msg-password">
              {formik.touched.password && (
                <InlineError
                  message={formik.errors.password}
                  fieldId="password"
                  aria-live="polite"
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
                ariaLabel="Se connecter"
                title="Se connecter"
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

export { AuthorizationLogin };
