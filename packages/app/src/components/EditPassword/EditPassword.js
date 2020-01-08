import { Button, Card, Field, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { PATH } from "../../constants/basePath";
import { passwordSchema } from "../../lib/validationSchemas";
import { Link } from "../Commons";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

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

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus, type);
    },
    validationSchema: passwordSchema,
    initialValues: {
      newPassword: "",
      newPasswordConfirmation: "",
      password: ""
    }
  });

  return (
    <Card mt="5" p="0">
      <Flex>
        <Box width={[1, 1 / 2]} bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
          <Box height="80px">
            <Heading4>{`Modifier votre mot de passe`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre mot de passe doit comprendre 8 caractères minimum et doit contenir au moins 1 chiffre et un caractère spécial.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 1 / 2]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <form onSubmit={formik.handleSubmit}>
              {!!formik.status && (
                <Box color="error" mb="1">
                  {formik.status.errorMsg}
                </Box>
              )}
              <Field>
                <Input
                  value={formik.values.password}
                  id="password"
                  name="password"
                  type="password"
                  hasError={formik.errors.password && formik.touched.password}
                  onChange={formik.handleChange}
                  placeholder="Votre mot de passe actuel"
                />
                {formik.errors.password && formik.touched.password && (
                  <Text mt="1">{formik.errors.password}</Text>
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.newPassword}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  hasError={formik.errors.newPassword && formik.touched.newPassword}
                  onChange={formik.handleChange}
                  placeholder="Votre nouveau mot de passe"
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <Text mt="1">{formik.errors.newPassword}</Text>
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.newPasswordConfirmation}
                  id="newPasswordConfirmation"
                  name="newPasswordConfirmation"
                  type="password"
                  hasError={
                    formik.errors.newPasswordConfirmation && formik.touched.newPasswordConfirmation
                  }
                  onChange={formik.handleChange}
                  placeholder="Confirmation de votre nouveau mot de passe"
                />
                {formik.errors.newPasswordConfirmation &&
                  formik.touched.newPasswordConfirmation && (
                    <Text mt="1">{formik.errors.newPasswordConfirmation}</Text>
                  )}
              </Field>
              <Flex alignItems="center" justifyContent="flex-end">
                <Box mr="2">
                  <Link href={`${PATH[type]}/informations`}>Annuler</Link>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                  >
                    Enregistrer
                  </Button>
                </Box>
              </Flex>
            </form>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { EditPassword };
