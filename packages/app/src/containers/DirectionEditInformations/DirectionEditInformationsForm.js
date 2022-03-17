import { useFormik } from "formik";
import { React } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { directionEditSchema } from "~/validation-schemas/directionEditSchema";
import { Button, Heading, Text, SrOnly } from "~/components";

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
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
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
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            formik={formik}
            id="nom"
            placeholder="Nom"
            validationSchema={directionEditSchema}
            autoComplete="family-name"
            ariaLabel="Votre nom"
          />
          <FormGroupInput
            formik={formik}
            id="email"
            placeholder="Email"
            validationSchema={directionEditSchema}
            autoComplete="email"
            ariaLabel="Votre email"
            ariaDescribedBy="email_format_attendu"
          />
          <SrOnly id="email_format_attendu">
            format attendu : nom@justice.fr
          </SrOnly>
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Button
            title="Annuler la modification de vos informations"
            aria-label="Annuler la modification de vos informations"
            as="a"
            href={cancelLink}
            type={null}
            variant="outline"
          >
            Annuler
          </Button>
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
