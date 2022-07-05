import { useApolloClient } from "@apollo/client";
import { useFormik } from "formik";
import { useContext } from "react";
import { Box, Flex } from "rebass";
import { useHistory } from "react-router-dom";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { GENDER_OPTIONS } from "~/constants/user";
import { signupSchema } from "~/validation-schemas";
import isEmailExists from "~/query-service/emjpm-hasura/isEmailExists";
import { Button, Heading, Text, SrOnly } from "~/components";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

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
  const history = useHistory();
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
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
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
              aria-label="Type d'utilisateur"
            />
          </FormInputBox>
        </Flex>
        <Flex role="group" aria-labelledby="informations_personelle_heading">
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
          <FormInputBox>
            <FormGroupSelect
              id="genre"
              formik={formik}
              placeholder="Civilité"
              value={formik.values.genre}
              options={GENDER_OPTIONS}
              validationSchema={signupSchema}
              aria-label="Civilité"
            />
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={signupSchema}
              normalizers={[normalizeFirstName]}
              autoComplete="given-name"
              ariaLabel="Votre prénom"
            />
            <FormGroupInput
              placeholder="NOM"
              id="nom"
              formik={formik}
              validationSchema={signupSchema}
              normalizers={[normalizeLastName]}
              autoComplete="family-name"
              ariaLabel="Votre nom"
            />
          </FormInputBox>
        </Flex>
        <Flex role="group" aria-labelledby="identifiants_de_connexion">
          <FormGrayBox>
            <Heading size={4} id="identifiants_de_connexion">
              {"Identifiants de connexion"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              placeholder="Email"
              id="email"
              formik={formik}
              validationSchema={signupSchema}
              autoComplete="email"
              ariaLabel="Votre email"
              ariaDescribedBy="format_email"
            />
            <SrOnly id="format_email">format attendu : nom@justice.fr</SrOnly>
            <FormGroupInput
              placeholder="Mot de passe"
              type="password"
              id="password"
              formik={formik}
              validationSchema={signupSchema}
              autoComplete="new-password"
              ariaLabel="Votre mot de passe"
            />
            <FormGroupInput
              placeholder="Confirmation du mot de passe"
              type="password"
              id="confirmPassword"
              formik={formik}
              validationSchema={signupSchema}
              autoComplete="new-password"
              ariaLabel="Votre mot de passe"
            />
          </FormInputBox>
        </Flex>
        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Button
              type={null}
              as="a"
              href="/"
              mr="2"
              variant="outline"
              aria-label="Annuler la création de votre compte"
              title="Annuler la création de votre compte"
            >
              Annuler
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
              aria-label="Aller à la page suivante"
              title="Aller à la page suivante"
            >
              Suivant
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}
