import { Formik } from "formik";
import { useState } from "react";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { Link } from "~/containers/Commons";
import config from "~/config";
import { resetPasswordSchema } from "~/validation-schemas";
import { Button, Card, Heading, InlineError, Input, Text } from "~/components";

import { useAuth } from "~/user/Auth";
import { useHistory } from "react-router-dom";

const { API_URL } = config;

const cardStyle = { mt: "5", p: "0" };

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5",
};

function ResetPassword(props) {
  const { token } = props;
  const [isMessageVisible, toggleMessage] = useState(false);
  const url = `${API_URL}/api/auth/reset-password-with-token`;
  const history = useHistory();

  const { login } = useAuth();

  const checkStatus = async (
    response,
    setSubmitting,
    setStatus,
    toggleMessage
  ) => {
    let json = null;
    setSubmitting(false);
    try {
      json = await response.json();
    } catch (errors) {
      setStatus({ errorMsg: errors.msg });
    }
    if (!response.ok) {
      setStatus({ errorMsg: json.errors.msg });
      return json;
    }
    toggleMessage(true);
    setTimeout(function () {
      login(json);
      history.push("/");
    }, 3000);
    return json;
  };

  const handleSubmit = async (
    values,
    setSubmitting,
    setStatus,
    token,
    toggleMessage
  ) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirmation,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    checkStatus(response, setSubmitting, setStatus, toggleMessage);
  };

  return (
    <Card
      sx={cardStyle}
      maxWidth={["100%", "60%", "50%"]}
      id="reset_password"
      tabIndex="-1"
    >
      <Box sx={grayBox}>
        <Box>
          <Heading size={4} mb="1">
            {"Nouveau mot de passe"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {
              "Pour changer votre mot de passe, saisissez les deux champs ci-dessous."
            }
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
              {`Votre mot de passe a bien été changé, vous allez être connecté automatiquement`}
            </Box>
          )}
        </Box>
      </Box>
      <Box p="5">
        <Box sx={{ position: "relative", zIndex: "1" }}>
          <Formik
            onSubmit={(values, { setSubmitting, setStatus }) =>
              handleSubmit(
                values,
                setSubmitting,
                setStatus,
                token,
                toggleMessage
              )
            }
            validationSchema={resetPasswordSchema}
            initialValues={{
              newPassword: "",
              newPasswordConfirmation: "",
            }}
          >
            {(props) => {
              const {
                status,
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleSubmit,
              } = props;
              return (
                <form noValidate onSubmit={handleSubmit}>
                  {!!status && (
                    <Box color="error" mb="1" role="alert">
                      {status.errorMsg}
                    </Box>
                  )}
                  <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                    <Input
                      value={values.newPassword}
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      hasError={errors.newPassword && touched.newPassword}
                      onChange={handleChange}
                      placeholder="Entrez votre nouveau mot de passe"
                      aria-describedby="msg-newPassword"
                      autoComplete="new-password"
                      ariaLabel="Votre nouveau mot de passe"
                    />
                    <div id="msg-newPassword">
                      {touched.newPassword && (
                        <InlineError
                          message={errors.newPassword}
                          fieldId="newPassword"
                        />
                      )}
                    </div>
                  </Box>
                  <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                    <Input
                      value={values.newPasswordConfirmation}
                      id="newPasswordConfirmation"
                      name="newPasswordConfirmation"
                      type="password"
                      hasError={
                        errors.newPasswordConfirmation &&
                        touched.newPasswordConfirmation
                      }
                      onChange={handleChange}
                      placeholder="Confirmer votre nouveau mot de passe"
                      aria-describedby="msg-newPasswordConfirmation"
                      autoComplete="new-password"
                      ariaLabel="Votre nouveau mot de passe"
                    />
                    <div id="msg-newPasswordConfirmation">
                      {touched.newPasswordConfirmation && (
                        <InlineError
                          message={errors.newPasswordConfirmation}
                          fieldId="newPasswordConfirmation"
                        />
                      )}
                    </div>
                  </Box>
                  <Flex alignItems="center" justifyContent="flex-end">
                    <Box mr="2">
                      <Link
                        to="/login"
                        title="Annuler l'enregistrement de mon nouveau mot de passe"
                        aria-label="Annuler l'enregistrement de mon nouveau mot de passe"
                      >
                        Annuler
                      </Link>
                    </Box>
                    <Box>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        title="Enregistrer mon nouveau mot de passe"
                        aria-label="Enregistrer mon nouveau mot de passe"
                      >
                        Enregistrer mon nouveau mot de passe
                      </Button>
                    </Box>
                  </Flex>
                </form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Card>
  );
}

export { ResetPassword };
