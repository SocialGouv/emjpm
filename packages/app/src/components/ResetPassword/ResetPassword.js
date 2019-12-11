import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import fetch from "unfetch";
import * as Yup from "yup";

import { Link } from "../Commons";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const cardStyle = { mt: "5", p: "0" };

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const checkStatus = async (response, setSubmitting, setStatus, toggleMessage) => {
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
  setTimeout(function() {
    Router.push(`/login`, `/login`, {
      shallow: true
    });
  }, 3000);
  return json;
};

const ResetPassword = props => {
  const { token } = props;
  const [isMessageVisible, toggleMessage] = useState(false);
  const url = `${API_URL}/api/v2/auth/reset-password-with-token`;

  const handleSubmit = async (values, setSubmitting, setStatus, token, toggleMessage) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirmation,
        token: token
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    checkStatus(response, setSubmitting, setStatus, toggleMessage);
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
                p: "1"
              }}
            >
              {`Votre mot de passe a bien été changé, vous allez être
              redirigé vers la page de connection`}
            </Box>
          )}
        </Box>
      </Box>
      <Box p="5">
        <Box sx={{ position: "relative", zIndex: "1" }}>
          <Formik
            onSubmit={(values, { setSubmitting, setStatus }) =>
              handleSubmit(values, setSubmitting, setStatus, token, toggleMessage)
            }
            validationSchema={Yup.object().shape({
              newPassword: Yup.string("Champ obligatoire")
                .min(8, "Votre mot de passe doit être de 8 caractères minimum")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
                  "Votre mot de passe doit contenir au moins 1 chiffre et un caractère spécial"
                )
                .required("Champ obligatoire"),
              newPasswordConfirmation: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Les mots de passe ne sont pas égaux")
                .required("Champ obligatoire")
            })}
            initialValues={{
              newPassword: "",
              newPasswordConfirmation: ""
            }}
          >
            {props => {
              const {
                status,
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleSubmit
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
                    {errors.newPassword && touched.newPassword && (
                      <Text mt="1">{errors.newPassword}</Text>
                    )}
                  </Box>
                  <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                    <Input
                      value={values.newPasswordConfirmation}
                      id="newPasswordConfirmation"
                      name="newPasswordConfirmation"
                      type="password"
                      hasError={errors.newPasswordConfirmation && touched.newPasswordConfirmation}
                      onChange={handleChange}
                      placeholder="Confirmer votre nouveau mot de passe"
                    />
                    {errors.newPasswordConfirmation && touched.newPasswordConfirmation && (
                      <Text mt="1">{errors.newPasswordConfirmation}</Text>
                    )}
                  </Box>
                  <Flex alignItems="center" justifyContent="flex-end">
                    <Box mr="2">
                      <Link href="/login">Annuler</Link>
                    </Box>
                    <Box>
                      <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
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
