import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import fetch from "unfetch";
import * as Yup from "yup";

import { PATH } from "../../constants/basePath";
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

const checkStatus = async (response, setSubmitting, setStatus, type) => {
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
  setSubmitting(false);
  Router.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
    shallow: true
  });
  return json;
};

const EditPassword = props => {
  const { username, type } = props;
  console.log(type);
  const url = `${API_URL}/api/v2/auth/reset-password`;

  const handleSubmit = async (values, setSubmitting, setStatus, type) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirmation,
        password: values.password,
        username: username
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    checkStatus(response, setSubmitting, setStatus, type);
  };

  return (
    <Card sx={cardStyle}>
      <Flex {...props}>
        <Box width={[1, 1 / 2]} sx={grayBox}>
          <Box height="80px">
            <Heading4>{`Modifier votre mot de passe`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre mot de passe doit comprendre 8 caractères minimum et doit contenir au moins 1 chiffre et un caractère spécial.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 1 / 2]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <Formik
              onSubmit={(values, { setSubmitting, setStatus }) =>
                handleSubmit(values, setSubmitting, setStatus, type)
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
                  .required("Champ obligatoire"),
                password: Yup.string().required("Champ obligatoire")
              })}
              initialValues={{
                newPassword: "",
                newPasswordConfirmation: "",
                password: ""
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
                        value={values.password}
                        id="password"
                        name="password"
                        type="password"
                        hasError={errors.password && touched.password}
                        onChange={handleChange}
                        placeholder="Votre mot de passe actuel"
                      />
                      {errors.password && touched.password && <Text mt="1">{errors.password}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.newPassword}
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        hasError={errors.newPassword && touched.newPassword}
                        onChange={handleChange}
                        placeholder="Votre nouveau mot de passe"
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
                        placeholder="Confirmation de votre nouveau mot de passe"
                      />
                      {errors.newPasswordConfirmation && touched.newPasswordConfirmation && (
                        <Text mt="1">{errors.newPasswordConfirmation}</Text>
                      )}
                    </Box>
                    <Flex alignItems="center" justifyContent="flex-end">
                      <Box mr="2">
                        <Link href={`${PATH[type]}/informations`}>Annuler</Link>
                      </Box>
                      <Box>
                        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                          Enregistrer
                        </Button>
                      </Box>
                    </Flex>
                  </form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { EditPassword };
