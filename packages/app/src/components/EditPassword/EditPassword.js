import {
  Button,
  Card,
  Field,
  Heading4,
  InlineError,
  Input,
  Text,
} from "@emjpm/ui";
import { useFormik } from "formik";
import getConfig from "next/config";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { Link } from "~/components/Commons";
import { UserContext } from "~/components/UserContext";
import { PATH } from "~/constants/basePath";
import { passwordSchema } from "~/lib/validationSchemas";

const {
  publicRuntimeConfig: { API_URL },
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
    shallow: true,
  });
  return json;
};

const EditPassword = () => {
  const { username, type } = useContext(UserContext);
  const url = `${API_URL}/api/auth/reset-password`;

  const handleSubmit = async (values, setSubmitting, setStatus, type) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirmation,
        password: values.password,
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    checkStatus(response, setSubmitting, setStatus, type);
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      newPasswordConfirmation: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus, type);
    },
    validationSchema: passwordSchema,
  });

  return (
    <Card mt="5" p="0">
      <Flex>
        <Box
          width={[1, 1 / 2]}
          bg="cardSecondary"
          borderRadius="5px 0 0 5px"
          p="5"
        >
          <Box height="80px">
            <Heading4>{`Modifier votre mot de passe`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre mot de passe doit comprendre 8 caractères minimum et doit contenir au moins 1 chiffre et un caractère spécial.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 1 / 2]}>
          <Box mb="2">
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
                <InlineError
                  message={formik.errors.password}
                  fieldId="password"
                />
              </Field>
              <Field>
                <Input
                  value={formik.values.newPassword}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  hasError={
                    formik.errors.newPassword && formik.touched.newPassword
                  }
                  onChange={formik.handleChange}
                  placeholder="Votre nouveau mot de passe"
                />
                <InlineError
                  message={formik.errors.newPassword}
                  fieldId="newPassword"
                />
              </Field>
              <Field>
                <Input
                  value={formik.values.newPasswordConfirmation}
                  id="newPasswordConfirmation"
                  name="newPasswordConfirmation"
                  type="password"
                  hasError={
                    formik.errors.newPasswordConfirmation &&
                    formik.touched.newPasswordConfirmation
                  }
                  onChange={formik.handleChange}
                  placeholder="Confirmation de votre nouveau mot de passe"
                />
                <InlineError
                  message={formik.errors.newPasswordConfirmation}
                  fieldId="newPasswordConfirmation"
                />
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
