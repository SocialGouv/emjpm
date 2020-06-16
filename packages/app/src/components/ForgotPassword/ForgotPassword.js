import { Button, Card, Field, Heading4, InlineError, Input, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import getConfig from "next/config";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import { forgotPasswordSchema } from "../../lib/validationSchemas";
import Sentry from "../../util/sentry";
import { Link } from "../Commons";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const ForgotPassword = () => {
  const url = `${API_URL}/api/auth/forgot-password`;
  const [mailSent, setMailSent] = useState(false);

  const handleSubmit = async (values, setSubmitting, setStatus) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        email: values.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    setSubmitting(false);
    let json = null;

    try {
      json = await response.json();
    } catch (error) {
      Sentry.captureException(error);
      setStatus({ error: "Une erreur est survenue, veuillez réessayer plus tard." });
      return;
    }

    if (!response.ok) {
      setStatus({ error: json.error });
      return;
    }

    setMailSent(true);
  };

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus);
    },
    validationSchema: forgotPasswordSchema,
    initialValues: {
      email: "",
    },
  });

  return (
    <Card mt="5" p="0" maxWidth={["100%", "60%", "50%"]}>
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading4 mb="1">{`Demande de réinitialisation du mot de passe`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Pour demander une réinitialisation de votre mot de passe, saisissez l'adresse e-mail que vous utilisez pour vous connecter à E-mjpm`}
          </Text>
          {mailSent && (
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
              {`Un email avec un lien de réinitialisation vient de vous être envoyé.`}
            </Box>
          )}
        </Box>
      </Box>
      <Box p="5">
        <form onSubmit={formik.handleSubmit}>
          {!!formik.status && (
            <Box color="error" mb="1">
              {formik.status.error}
            </Box>
          )}
          <Field>
            <Input
              value={formik.values.email}
              id="email"
              name="email"
              type="text"
              hasError={formik.errors.email && formik.touched.email}
              onChange={formik.handleChange}
              placeholder="Entrez votre email"
            />
            {formik.touched.email && <InlineError message={formik.errors.email} fieldId="email" />}
          </Field>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box mr="2">
              <Link href="/login">Annuler</Link>
            </Box>
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Obtenir le lien de réinitialisation
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Card>
  );
};

export { ForgotPassword };
