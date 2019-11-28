import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React from "react";
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

function checkStatus(response, setSubmitting, setStatus) {
  if (response.ok) {
    setSubmitting(false);
    Router.push(`/login`, `/login`, {
      shallow: true
    });
    return response;
  } else {
    response.json().then(response => {
      setStatus({ errorMsg: response.errors.msg });
      setSubmitting(false);
    });
  }
}

const ResetPassword = props => {
  const { token } = props;
  const url = `${API_URL}/api/v2/auth/reset-password-with-token`;

  const handleSubmit = async (values, setSubmitting, setStatus, token) => {
    fetch(url, {
      body: JSON.stringify({
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirmation,
        token: token
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(response => checkStatus(response, setSubmitting, setStatus));
  };

  return (
    <Card sx={cardStyle} maxWidth={["100%", "60%", "50%"]}>
      <Box sx={grayBox}>
        <Box>
          <Heading4 mb="1">{`Nouveau mot de passe`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Pour changer votre mot de passe, saisissez remplissez les deux champs si dessous.`}
          </Text>
        </Box>
      </Box>
      <Box p="5">
        <Box sx={{ position: "relative", zIndex: "1" }}>
          <Formik
            onSubmit={(values, { setSubmitting, setStatus }) =>
              handleSubmit(values, setSubmitting, setStatus, token)
            }
            validationSchema={Yup.object().shape({
              newPassword: Yup.string("Champs obligatoire")
                .min(8, "Votre mot de passe doit être de 8 caractères minimum")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
                  "Votre mot de passe doit contenir au moins 1 chiffre et un caractère spécial"
                )
                .required("Champs obligatoire"),
              newPasswordConfirmation: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Les mots de passe ne sont pas égaux")
                .required("Champs obligatoire")
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
