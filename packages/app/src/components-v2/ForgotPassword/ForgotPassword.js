import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import getConfig from "next/config";
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
    setStatus({ errorMsg: json.message });
    return json;
  }
  toggleMessage(true);
  return json;
};

const ForgotPassword = () => {
  const url = `${API_URL}/api/v2/auth/forgot-password`;
  const [isMessageVisible, toggleMessage] = useState(false);
  const handleSubmit = async (values, setSubmitting, setStatus) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        email: values.email
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
          <Heading4 mb="1">{`Demande de réinitialisation du mot de passe`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Pour demander une réinitialisation de votre mot de passe, saisissez l'adresse e-mail que vous utilisez pour vous connecter à E-mjpm`}
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
              {`Un email avec un lien de réinitialisation vient de vous être envoyé.`}
            </Box>
          )}
        </Box>
      </Box>
      <Box p="5">
        <Box sx={{ position: "relative", zIndex: "1" }}>
          <Formik
            onSubmit={(values, { setSubmitting, setStatus }) =>
              handleSubmit(values, setSubmitting, setStatus, toggleMessage)
            }
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Le format de votre email n'est pas correct")
                .required("Champ obligatoire")
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

export { ForgotPassword };
