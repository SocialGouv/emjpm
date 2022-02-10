import { useFormik } from "formik";
import { React } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Link";
import { adminEditSchema } from "~/validation-schemas/adminEditSchema";
import { Button, Heading, Text } from "~/components";

function AdminEditInformationsForm({ user, handleSubmit, cancelLink }) {
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
      <Flex id="modifier_informations" tabIndex="0">
        <FormGrayBox>
          <Heading size={4}>{"Modifier vos informations"}</Heading>
          <Text
            lineHeight="1.5"
            color="textSecondary"
            id="modifier_informations"
          >
            {"Vos informations"}
          </Text>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="modifier_informations">
          <FormGroupInput
            formik={formik}
            id="prenom"
            placeholder="Prénom"
            validationSchema={adminEditSchema}
            autoComplete="given-name"
            aria-label="Votre prénom"
          />
          <FormGroupInput
            formik={formik}
            id="nom"
            placeholder="Nom"
            validationSchema={adminEditSchema}
            autoComplete="family-name"
            aria-label="Votre nom"
          />
          <FormGroupInput
            formik={formik}
            id="email"
            placeholder="Email"
            validationSchema={adminEditSchema}
            autoComplete="email"
            aria-label="Votre email"
          />
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link to={cancelLink}>
            <Button
              variant="outline"
              title="Annuler la modification de vos informations"
              aria-label="Annuler la modification de vos informations"
            >
              Annuler
            </Button>
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

export { AdminEditInformationsForm };
