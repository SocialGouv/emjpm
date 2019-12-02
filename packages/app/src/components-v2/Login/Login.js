import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React from "react";
import ReactPiwik from "react-piwik";
import { Box, Flex } from "rebass";
import fetch from "unfetch";
import * as Yup from "yup";

import { authService } from "../../business";
import { trackUser } from "../../piwik";
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
  authService.login(json.token);
  ReactPiwik.push(["trackEvent", "login", "success"]);
  trackUser();
  Router.push(json.url);
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

  return (
    <Card sx={cardStyle}>
      <Box sx={grayBox}>
        <Box>
          <Heading4 mb="1">{`Connectez-vous à votre compte.`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Indiquez votre email et votre mot de passe pour vous connecter.`}
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
              password: Yup.string().required("Champ obligatoire"),
              username: Yup.string().required("Champ obligatoire")
            })}
            initialValues={{
              password: "",
              username: ""
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
                      value={values.username}
                      id="username"
                      name="username"
                      type="text"
                      hasError={errors.username && touched.username}
                      onChange={handleChange}
                      placeholder="Votre nom d'utilisateur"
                    />
                    {errors.username && touched.username && <Text mt="1">{errors.username}</Text>}
                  </Box>
                  <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                    <Input
                      value={values.password}
                      id="password"
                      name="password"
                      type="password"
                      hasError={errors.password && touched.password}
                      onChange={handleChange}
                      placeholder="Votre mot de passe"
                    />
                    {errors.password && touched.password && <Text mt="1">{errors.password}</Text>}
                  </Box>
                  <Flex alignItems="center" justifyContent="flex-end">
                    <Box>
                      <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
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
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Card>
  );
};

export { Login };
