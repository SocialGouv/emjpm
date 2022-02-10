import { useFormik } from "formik";
import { React } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Link";
import { directionEditSchema } from "~/validation-schemas/directionEditSchema";
import { Button, Heading, Text } from "~/components";

function DirectionEditInformationsForm({ user, handleSubmit, cancelLink }) {
  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      nom: user.nom || "",
      prenom: user.prenom || "",
    },
    onSubmit: handleSubmit,
    validationSchema: directionEditSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4} id="modifier_vos_informations_heading">
            {"Modifier vos informations"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Vos informations"}
          </Text>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="modifier_vos_informations_heading"
        >
          <FormGroupInput
            formik={formik}
            id="prenom"
            placeholder="Prénom"
            validationSchema={directionEditSchema}
            autoComplete="given-name"
            aria-label="Votre prénom"
          />
          <FormGroupInput
            formik={formik}
            id="nom"
            placeholder="Nom"
            validationSchema={directionEditSchema}
            autoComplete="family-name"
            aria-label="Votre nom"
          />
          <FormGroupInput
            formik={formik}
            id="email"
            placeholder="Email"
            validationSchema={directionEditSchema}
            autoComplete="email"
            aria-label="Votre email"
          />
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link
            to={cancelLink}
            title="Annuler la modification de vos informations"
            aria-label="Annuler la modification de vos informations"
          >
            <Button variant="outline">Annuler</Button>
          </Link>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            title="Enregistrer la modification de vos informations"
            aria-label="Enregistrer la modification de vos informations"
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export { DirectionEditInformationsForm };
