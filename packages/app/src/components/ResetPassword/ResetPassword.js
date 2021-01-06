import { Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { Link } from "~/components/Commons";
import config from "~/config";
import { resetPasswordSchema } from "~/lib/validationSchemas";
import { Button, Card, Heading4, InlineError, Input, Text } from "~/ui";

const { API_URL } = config;

const cardStyle = { mt: "5", p: "0" };

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5",
};

const checkStatus = async (
  response,
  setSubmitting,
  setStatus,
  toggleMessage,
  history
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
    history.push(`/login`, `/login`, {
      shallow: true,
    });
  }, 3000);
  return json;
};

const ResetPassword = (props) => {
  const history = useHistory();
  const { token } = props;
  const [isMessageVisible, toggleMessage] = useState(false);
  const url = `${API_URL}/api/auth/reset-password-with-token`;

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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    checkStatus(response, setSubmitting, setStatus, toggleMessage, history);
  };

  return (
    <Card sx={cardStyle} maxWidth={["100%", "60%", "50%"]}>
      <Box sx={grayBox}>
        <Box>
          <Heading4 mb="1">{`Nouveau mot de passe`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Pour changer votre mot de passe, saisissez les deux champs ci-dessous.`}
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
              {`Votre mot de passe a bien été changé, vous allez être
              redirigé vers la page de connexion`}
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
                <form onSubmit={handleSubmit}>
                  {!!status && (
                    <Box color="error" mb="1">
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
                    />
                    {touched.newPassword && (
                      <InlineError
                        message={errors.newPassword}
                        fieldId="newPassword"
                      />
                    )}
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
                    />
                    {touched.newPasswordConfirmation && (
                      <InlineError
                        message={errors.newPasswordConfirmation}
                        fieldId="newPasswordConfirmation"
                      />
                    )}
                  </Box>
                  <Flex alignItems="center" justifyContent="flex-end">
                    <Box mr="2">
                      <Link to="/login">Annuler</Link>
                    </Box>
                    <Box>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
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
};

export { ResetPassword };
