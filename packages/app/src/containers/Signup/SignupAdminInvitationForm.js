import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Link";
import { signupAdminSchema } from "~/validation-schemas";
import { Button, Heading, Text, SrOnly } from "~/components";

import Auth2FA from "~/containers/Auth2FA/Auth2FA";

export function SignupAdminInvitationForm(props) {
  const { handleSubmit, invitation } = props;

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      email: invitation.email,
      nom: "",
      password: "",
      prenom: "",
    },
    onSubmit: handleSubmit,
    validationSchema: signupAdminSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex role="group" aria-labelledby="informations_personnelles">
        <FormGrayBox>
          <Heading size={4} id="informations_personnelles">
            {"Information personnelle"}
          </Heading>
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
            validationSchema={signupAdminSchema}
            autoComplete="family-name"
            aria-label="Votre nom de famille"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.prenom}
            id="prenom"
            placeholder="Prénom"
            validationSchema={signupAdminSchema}
            autoComplete="given-name"
            aria-label="Votre prénom"
          />
        </FormInputBox>
      </Flex>
      <Flex role="group" aria-labelledby="indetifiants">
        <FormGrayBox>
          <Heading size={4} id="indetifiants">
            {"Identifiants de connexion"}
          </Heading>
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
            readOnly
            value={formik.values.email}
            id="email"
            placeholder="Email"
            validationSchema={signupAdminSchema}
            autoComplete="email"
            aria-label="Votre email"
            ariaDescribedBy="email_format"
          />
          <SrOnly id="email_format">format attendu : nom@justice.fr </SrOnly>
          <FormGroupInput
            formik={formik}
            value={formik.values.password}
            type="password"
            id="password"
            placeholder="Mot de passe"
            validationSchema={signupAdminSchema}
            autoComplete="new-password"
            aria-label="Votre nouveau mot de passe"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.confirmPassword}
            type="password"
            id="confirmPassword"
            placeholder="Confirmation du mot de passe"
            validationSchema={signupAdminSchema}
            autoComplete="new-password"
            aria-label="Confirmation de votre nouveau mot de passe"
          />
          <Auth2FA
            unfolded
            formik={formik}
            validationSchema={signupAdminSchema}
            user={invitation.email}
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
