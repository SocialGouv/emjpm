import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Link";
import { signupSchema } from "~/validation-schemas";
import { Button, Heading, Text } from "~/components";
import { GENDER_OPTIONS } from "~/constants/user";

export function SignupServiceInvitationForm(props) {
  const { handleSubmit, invitation } = props;

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      email: invitation.email,
      nom: "",
      password: "",
      prenom: "",
      type: "service",
    },
    onSubmit: handleSubmit,
    validationSchema: signupSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>{"Information personnelle"}</Heading>
          <Text lineHeight="1.5" color="textSecondary">
            Ces informations permettent de vous identifier.
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            formik={formik}
            value={formik.values.nom}
            id="nom"
            placeholder="Nom"
            validationSchema={signupSchema}
            autoComplete="family-name"
            aria-label="Votre nom de famille"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.prenom}
            id="prenom"
            placeholder="Prénom"
            validationSchema={signupSchema}
            autoComplete="given-name"
            aria-label="Votre prénom"
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>{"Identifiants de connexion"}</Heading>
          <Text
            lineHeight="1.5"
            color="textSecondary"
            id="identifiants_de_connexion_heading"
          >
            {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
          </Text>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="identifiants_de_connexion_heading"
        >
          <FormGroupInput
            formik={formik}
            disabled
            value={formik.values.email}
            id="email"
            placeholder="Email"
            validationSchema={signupSchema}
            autoComplete="email"
            aria-label="Votre email"
          />
          <FormGroupSelect
            id="genre"
            options={GENDER_OPTIONS}
            placeholder="Civilité"
            value={formik.values.genre}
            formik={formik}
            validationSchema={signupSchema}
            autoComplete="sex"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.password}
            type="password"
            id="password"
            placeholder="Mot de passe"
            validationSchema={signupSchema}
            autoComplete="new-password"
            aria-label="Votre nouveau mot de passe"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.confirmPassword}
            type="password"
            id="confirmPassword"
            placeholder="Confirmation du mot de passe"
            validationSchema={signupSchema}
            autoComplete="new-password"
            aria-label="Confirmation de votre nouveau mot de passe"
          />
        </FormInputBox>
      </Flex>
      <Flex justifyContent="flex-end" p={1}>
        <Box>
          <Link
            to="/"
            aria-label="Annuler la création de votre compte"
            title="Annuler la création de votre compte"
          >
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
            aria-label="Aller à la page suivante"
            title="Suivant"
          >
            Suivant
          </Button>
        </Box>
      </Flex>
    </form>
  );
}
