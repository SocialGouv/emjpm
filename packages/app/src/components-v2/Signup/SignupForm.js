import { useApolloClient } from "@apollo/react-hooks";
import { Button, Card, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { SignupContext } from "./context";
import { CHECK_EMAIL_UNICITY } from "./queries";

const TYPE_OPTIONS = [
  {
    label: "Mandataire individuel",
    value: "individuel"
  },
  {
    label: "Mandataire préposé",
    value: "prepose"
  },
  {
    label: "Service",
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

export const SignupForm = props => {
  const { user, setUser, validateStepOne } = useContext(SignupContext);

  const client = useApolloClient();

  const isEmailExists = async email => {
    const checkEmail = await client.query({
      query: CHECK_EMAIL_UNICITY,
      fetchPolicy: "network-only",
      context: {
        headers: {
          "X-Hasura-Email": email
        }
      }
    });
    return checkEmail.data.users.length > 0;
  };

  return (
    <Card>
      <Flex {...props}>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
            <Formik
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                const exists = await isEmailExists(values.email);
                if (exists) {
                  setErrors({
                    email: "Cet email existe déjà"
                  });
                } else {
                  setUser({
                    type: values.type.value,
                    email: values.email,
                    nom: values.nom,
                    prenom: values.prenom,
                    password: values.password,
                    confirmPassword: values.confirmPassword
                  });
                  validateStepOne(true);
                }

                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                type: Yup.string().required("Champs obligatoire"),
                email: Yup.string()
                  .email("Le format de votre email n'est pas correct")
                  .required("Champs obligatoire"),
                nom: Yup.string().required("Champs obligatoire"),
                prenom: Yup.string().required("Champs obligatoire"),
                password: Yup.string()
                  .label("Mot de passe")
                  .required()
                  .min(8, "Votre mot de passe doit être de 8 caractères minimum")
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
                    {
                      message:
                        "Votre mot de passe doit contenir contenir au moins 1 chiffre et un caractère spéciale"
                    }
                  ),
                confirmPassword: Yup.string()
                  .required()
                  .label("Confirmation du mot de passe")
                  .test("passwords-match", "Les mots de passe ne sont pas égaux", function(value) {
                    return this.parent.password === value;
                  })
              })}
              initialValues={{
                type: user ? TYPE_OPTIONS.find(val => user.type === val.value) : "",
                email: user ? user.email : "",
                nom: user ? user.nom : "",
                prenom: user ? user.prenom : "",
                password: user ? user.password : "",
                confirmPassword: user ? user.confirmPassword : ""
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
                    <Box sx={{ zIndex: "110", position: "relative" }} mb="2">
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
                    <Box mb="2">
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
  );
};
