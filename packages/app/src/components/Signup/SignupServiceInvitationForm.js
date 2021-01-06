import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Link";
import { signupSchema } from "~/lib/validationSchemas";
import { Button, Heading4, Text } from "~/ui";

export const SignupServiceInvitationForm = (props) => {
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
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4>{"Information personnelle"}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            Ces informations permettent de vous identifier.
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.nom}
            id="nom"
            placeholder="Nom"
            validationSchema={signupSchema}
          />
          <FormGroupInput
            value={formik.values.prenom}
            id="prenom"
            placeholder="Prénom"
            validationSchema={signupSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4>{"Identifiants de connexion"}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            disabled
            value={formik.values.email}
            id="email"
            placeholder="Email"
            validationSchema={signupSchema}
          />
          <FormGroupInput
            value={formik.values.password}
            type="password"
            id="password"
            placeholder="Mot de passe"
            validationSchema={signupSchema}
          />
          <FormGroupInput
            value={formik.values.confirmPassword}
            type="password"
            id="confirmPassword"
            placeholder="Confirmation du mot de passe"
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
  );
};
