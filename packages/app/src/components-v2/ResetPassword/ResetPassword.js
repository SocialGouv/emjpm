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
      setStatus({ errorMsg: response.message });
      setSubmitting(false);
    });
  }
}

const ResetPassword = () => {
  const url = `${API_URL}/api/v2/auth/forgot-password`;

  const handleSubmit = async (values, setSubmitting, setStatus) => {
    fetch(url, {
      body: JSON.stringify({
        email: values.email
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
          <Heading4>{`Réinitialisation du mot de passe`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Pour réinitialiser votre mot de passe, saisissez l'adresse e-mail que vous utilisez pour vous connecter à E-mjpm`}
          </Text>
        </Box>
      </Box>
      <Box p="5">
        <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
          <Formik
            onSubmit={(values, { setSubmitting, setStatus }) =>
              handleSubmit(values, setSubmitting, setStatus)
            }
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Le format de votre email n'est pas correct")
                .required("Champs obligatoire")
            })}
            initialValues={{
              email: ""
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
                      value={values.email}
                      id="email"
                      name="email"
                      type="text"
                      hasError={errors.email && touched.email}
                      onChange={handleChange}
                      placeholder="Entrez votre email"
                    />
                    {errors.email && touched.email && <Text mt="1">{errors.email}</Text>}
                  </Box>
                  <Flex alignItems="center" justifyContent="flex-end">
                    <Box mr="2">
                      <Link href="/login">Annuler</Link>
                    </Box>
                    <Box>
                      <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                        Obtenir le lien de réinitialisation
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
