import { Button, Field, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex } from "rebass";

import { signupSchema } from "../../lib/validationSchemas";

export const SignupServiceInvitationForm = (props) => {
  const { handleSubmit, invitation } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: signupSchema,
    initialValues: {
      confirmPassword: "",
      email: invitation.email,
      nom: "",
      password: "",
      prenom: "",
      type: "service",
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.nom}
          id="nom"
          name="nom"
          hasError={formik.errors.nom && formik.touched.nom}
          onChange={formik.handleChange}
          placeholder="Nom"
        />
        {formik.touched.nom && <InlineError message={formik.errors.nom} fieldId="nom" />}
      </Field>
      <Field>
        <Input
          value={formik.values.prenom}
          id="prenom"
          name="prenom"
          hasError={formik.errors.prenom && formik.touched.prenom}
          onChange={formik.handleChange}
          placeholder="Prénom"
        />
        {formik.touched.prenom && <InlineError message={formik.errors.prenom} fieldId="prenom" />}
      </Field>
      <Field>
        <Input disabled value={formik.values.email} id="email" name="email" placeholder="Email" />
        <InlineError message={formik.errors.email} fieldId="email" />
      </Field>
      <Field>
        <Input
          value={formik.values.password}
          type="password"
          id="password"
          name="password"
          hasError={formik.errors.password && formik.touched.password}
          onChange={formik.handleChange}
          placeholder="Mot de passe"
        />
        {formik.touched.password && (
          <InlineError message={formik.errors.password} fieldId="password" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.confirmPassword}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          hasError={formik.errors.confirmPassword && formik.touched.confirmPassword}
          onChange={formik.handleChange}
          placeholder="Confirmation du mot de passe"
        />
        {formik.touched.confirmPassword && (
          <InlineError message={formik.errors.confirmPassword} fieldId="confirmPassword" />
        )}
      </Field>
      <Flex justifyContent="flex-end">
        <Box>
          <Button mr="2" variant="outline">
            <Link href="/">
              <a>Annuler</a>
            </Link>
          </Button>
        </Box>
        <Box>
          <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
            Suivant
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
