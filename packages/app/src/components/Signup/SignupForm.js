import { useApolloClient } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Field,
  Heading1,
  Heading4,
  InlineError,
  Input,
  Select,
  Text,
} from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { signupSchema } from "../../lib/validationSchemas";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { SignupContext } from "./context";
import { cardStyle, grayBox } from "./style";

const TYPE_OPTIONS = [
  {
    label: "Mandataire individuel",
    value: "individuel",
  },
  {
    label: "Mandataire préposé d'établissement",
    value: "prepose",
  },
  {
    label: "Service mandataire",
    value: "service",
  },
  {
    label: "Tribunal d'instance",
    value: "ti",
  },
  {
    label: "Agent de l'état",
    value: "direction",
  },
];

export const SignupForm = () => {
  const { user, setUser, validateStepOne } = useContext(SignupContext);

  const client = useApolloClient();

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const exists = await isEmailExists(client, values.email);
      if (exists) {
        setErrors({
          email: "Cet email existe déjà",
        });
      } else {
        setUser({
          confirmPassword: values.confirmPassword,
          email: values.email,
          nom: values.nom,
          password: values.password,
          prenom: values.prenom,
          type: values.type.value,
        });
        validateStepOne(true);
      }

      setSubmitting(false);
    },
    validationSchema: signupSchema,
    initialValues: {
      confirmPassword: user ? user.confirmPassword : "",
      email: user ? user.email : "",
      nom: user ? user.nom : "",
      password: user ? user.password : "",
      prenom: user ? user.prenom : "",
      type: user ? TYPE_OPTIONS.find((val) => user.type === val.value) : "",
    },
  });

  return (
    <Fragment>
      <Heading1 px="1">{`Création de compte`}</Heading1>
      <Card sx={cardStyle}>
        <Flex mt="3">
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="80px">
              <Heading4>{`Information professionelle`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Quel type d'utilisateur êtes-vous ?`}
              </Text>
            </Box>
            <Box height="140px">
              <Heading4>{`Information personnelle`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                Ces informations permettent de vous identifier.
              </Text>
            </Box>
            <Box height="160px">
              <Heading4>{`Identifiants de connexion`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
              </Text>
            </Box>
          </Box>
          <Box p="5" pb={0} mb="4" width={[1, 3 / 5]}>
            <form onSubmit={formik.handleSubmit}>
              <Field>
                <Select
                  id="type"
                  name="type"
                  placeholder="Vous êtes..."
                  value={formik.values.type}
                  hasError={formik.errors.type && formik.touched.type}
                  onChange={(option) => formik.setFieldValue("type", option)}
                  options={TYPE_OPTIONS}
                />
                {formik.touched.type && <InlineError message={formik.errors.type} fieldId="type" />}
              </Field>
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
                {formik.touched.prenom && (
                  <InlineError message={formik.errors.prenom} fieldId="prenom" />
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.email}
                  id="email"
                  name="email"
                  hasError={formik.errors.email && formik.touched.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                {formik.touched.email && (
                  <InlineError message={formik.errors.email} fieldId="email" />
                )}
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
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                  >
                    Suivant
                  </Button>
                </Box>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
};
