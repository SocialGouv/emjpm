import { useApolloClient } from "@apollo/client";
import { useFormik } from "formik";
import { useContext } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { Link } from "~/components/Link";
import { GENDER_OPTIONS } from "~/constants/user";
import { signupSchema } from "~/validation-schemas";
import isEmailExists from "~/query-service/emjpm-hasura/isEmailExists";
import { Button, Heading, Text } from "~/components";

import { SignupContext } from "./context";

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
    label: "Juge des tutelles",
    value: "ti",
  },
  {
    label: "Greffier",
    value: "greffier",
  },
  {
    label: "Agent de l'état",
    value: "direction",
  },
];

export function SignupForm() {
  const { user, setUser, validateStepOne } = useContext(SignupContext);

  const client = useApolloClient();

  const formik = useFormik({
    initialValues: {
      confirmPassword: user ? user.confirmPassword : "",
      email: user ? user.email : "",
      genre: user ? user.genre : "",
      nom: user ? user.nom : "",
      password: user ? user.password : "",
      prenom: user ? user.prenom : "",
      type: user ? user.type : "",
    },
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
          genre: values.genre,
          nom: values.nom,
          password: values.password,
          prenom: values.prenom,
          type: values.type,
        });
        validateStepOne(true);
      }

      setSubmitting(false);
    },
    validationSchema: signupSchema,
  });

  return (
    <>
      <HeadingTitle p="1" m="1">
        {"Création de compte"}
      </HeadingTitle>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Flex>
          <FormGrayBox>
            <Heading size={4}>{"Information professionnelle"}</Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {"Quel type d'utilisateur êtes-vous ?"}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="type"
              formik={formik}
              placeholder="Vous êtes..."
              value={formik.values.type}
              options={TYPE_OPTIONS}
              validationSchema={signupSchema}
            />
          </FormInputBox>
        </Flex>
        <Flex>
          <FormGrayBox>
            <Heading size={4}>{"Information personnelle"}</Heading>
            <Text
              lineHeight="1.5"
              color="textSecondary"
              id="informations_personelle_heading"
            >
              {"Ces informations permettent de vous identifier."}
            </Text>
          </FormGrayBox>
          <FormInputBox
            role="group"
            aria-labelledby="informations_personelle_heading"
          >
            <FormGroupSelect
              id="genre"
              formik={formik}
              placeholder="Civilité"
              value={formik.values.genre}
              options={GENDER_OPTIONS}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Nom"
              id="nom"
              formik={formik}
              validationSchema={signupSchema}
            />
          </FormInputBox>
        </Flex>
        <Flex>
          <FormGrayBox>
            <Heading size={4} id="identifiants_de_connexion">
              {"Identifiants de connexion"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
            </Text>
          </FormGrayBox>
          <FormInputBox
            role="group"
            aria-labelledby="identifiants_de_connexion"
          >
            <FormGroupInput
              placeholder="Email"
              id="email"
              formik={formik}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Mot de passe"
              type="password"
              id="password"
              formik={formik}
              validationSchema={signupSchema}
            />
            <FormGroupInput
              placeholder="Confirmation du mot de passe"
              type="password"
              id="confirmPassword"
              formik={formik}
              validationSchema={signupSchema}
            />
          </FormInputBox>
        </Flex>
        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Link to="/">
              <Button mr="2" variant="outline">
                Annuler
              </Button>
            </Link>
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
    </>
  );
}
