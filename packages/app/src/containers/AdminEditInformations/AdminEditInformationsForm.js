import { useFormik } from "formik";
import { React } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { adminEditSchema } from "~/validation-schemas/adminEditSchema";
import { Button, Heading, Text, SrOnly } from "~/components";

import Auth2FA from "./Auth2FA";

function AdminEditInformationsForm({
  user,
  handleSubmit,
  cancelLink,
  isAdmin,
}) {
  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      nom: user.nom || "",
      prenom: user.prenom || "",
    },
    onSubmit: handleSubmit,
    validationSchema: adminEditSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex id="modifier_informations" tabIndex="-1">
        <FormGrayBox>
          <Heading size={4}>{"Modifier vos informations"}</Heading>
          <Text
            lineHeight="1.5"
            color="textSecondary"
            id="modifier_informations_heading"
          >
            {"Vos informations"}
          </Text>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="modifier_informations_heading"
        >
          <FormGroupInput
            formik={formik}
            id="prenom"
            placeholder="Prénom"
            validationSchema={adminEditSchema}
            autoComplete="given-name"
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            formik={formik}
            id="nom"
            placeholder="Nom"
            validationSchema={adminEditSchema}
            autoComplete="family-name"
            ariaLabel="Votre nom"
          />
          <FormGroupInput
            formik={formik}
            id="email"
            placeholder="Email"
            validationSchema={adminEditSchema}
            autoComplete="email"
            ariaLabel="Votre email"
            ariaDescribedBy="email_format_attendu"
          />
          <SrOnly id="email_format_attendu">
            format attendu : nom@justice.fr
          </SrOnly>
          {!isAdmin && (
            <Auth2FA formik={formik} validationSchema={adminEditSchema} />
          )}
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Button
            type={null}
            as="a"
            href={cancelLink}
            variant="outline"
            title="Annuler la modification de vos informations"
            aria-label="Annuler la modification de vos informations"
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

export { AdminEditInformationsForm };
