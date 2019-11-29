import { useApolloClient } from "@apollo/react-hooks";
import { Button, Card, Heading1, Heading4, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { SignupContext } from "./context";
import { CHECK_EMAIL_UNICITY } from "./queries";
import { cardStyle, grayBox } from "./style";

const TYPE_OPTIONS = [
  {
    label: "Mandataire individuel",
    value: "individuel"
  },
  {
    label: "Mandataire préposé d'établissement",
    value: "prepose"
  },
  {
    label: "Service mandataire",
    value: "service"
  },
  {
    label: "Tribunal d'instance",
    value: "ti"
  },
  {
    label: "Agent de l'état",
    value: "direction"
  }
];

export const SignupForm = () => {
  const { user, setUser, validateStepOne } = useContext(SignupContext);

  const client = useApolloClient();

  const isEmailExists = async email => {
    const checkEmail = await client.query({
      context: {
        headers: {
          "X-Hasura-Email": email
        }
      },
      fetchPolicy: "network-only",
      query: CHECK_EMAIL_UNICITY
    });
    return checkEmail.data.users.length > 0;
  };

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
          <Box p="5" pb={0} width={[1, 3 / 5]}>
            <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
              <Formik
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const exists = await isEmailExists(values.email);
                  if (exists) {
                    setErrors({
                      email: "Cet email existe déjà"
                    });
                  } else {
                    setUser({
                      confirmPassword: values.confirmPassword,
                      email: values.email,
                      nom: values.nom,
                      password: values.password,
                      prenom: values.prenom,
                      type: values.type.value
                    });
                    validateStepOne(true);
                  }

                  setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                  confirmPassword: Yup.string()
                    .required()
                    .label("Confirmation du mot de passe")
                    .test("passwords-match", "Les mots de passe ne sont pas égaux", function(
                      value
                    ) {
                      return this.parent.password === value;
                    }),
                  email: Yup.string()
                    .email("Le format de votre email n'est pas correct")
                    .required("Champ obligatoire"),
                  nom: Yup.string().required("Champ obligatoire"),
                  password: Yup.string()
                    .label("Mot de passe")
                    .required()
                    .min(8, "Votre mot de passe doit être de 8 caractères minimum")
                    .matches(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
                      {
                        message:
                          "Votre mot de passe doit contenir au moins 1 chiffre et un caractère spéciale"
                      }
                    ),
                  prenom: Yup.string().required("Champ obligatoire"),
                  type: Yup.string().required("Champ obligatoire")
                })}
                initialValues={{
                  confirmPassword: user ? user.confirmPassword : "",
                  email: user ? user.email : "",
                  nom: user ? user.nom : "",
                  password: user ? user.password : "",
                  prenom: user ? user.prenom : "",
                  type: user ? TYPE_OPTIONS.find(val => user.type === val.value) : ""
                }}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ position: "relative", zIndex: "110" }} mb="2">
                        <Select
                          id="type"
                          name="type"
                          placeholder="Vous êtes..."
                          value={values.type}
                          hasError={errors.type && touched.type}
                          onChange={option => setFieldValue("type", option)}
                          options={TYPE_OPTIONS}
                        />
                        {errors.type && touched.type && <Text>{errors.type}</Text>}
                      </Box>

                      <Box mb="2" pt="2">
                        <Input
                          value={values.nom}
                          id="nom"
                          name="nom"
                          hasError={errors.nom && touched.nom}
                          onChange={handleChange}
                          placeholder="Nom"
                        />
                        {errors.nom && touched.nom && <Text>{errors.nom}</Text>}
                      </Box>
                      <Box mb="2">
                        <Input
                          value={values.prenom}
                          id="prenom"
                          name="prenom"
                          hasError={errors.prenom && touched.prenom}
                          onChange={handleChange}
                          placeholder="Prénom"
                        />
                        {errors.prenom && touched.prenom && <Text>{errors.prenom}</Text>}
                      </Box>
                      <Box mb="2" pt="2">
                        <Input
                          value={values.email}
                          id="email"
                          name="email"
                          hasError={errors.email && touched.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                        {errors.email && touched.email && <Text>{errors.email}</Text>}
                      </Box>
                      <Box mb="2">
                        <Input
                          value={values.password}
                          type="password"
                          id="password"
                          name="password"
                          hasError={errors.password && touched.password}
                          onChange={handleChange}
                          placeholder="Mot de passe"
                        />
                        {errors.password && touched.password && <Text>{errors.password}</Text>}
                      </Box>
                      <Box mb="2">
                        <Input
                          value={values.confirmPassword}
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          hasError={errors.confirmPassword && touched.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirmation du mot de passe"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <Text>{errors.confirmPassword}</Text>
                        )}
                      </Box>
                      <Flex justifyContent="flex-end">
                        <Box>
                          <Button mr="2" variant="outline">
                            <Link href="/">
                              <a>Annuler</a>
                            </Link>
                          </Button>
                        </Box>
                        <Box>
                          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                            Suivant
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
    </Fragment>
  );
};
