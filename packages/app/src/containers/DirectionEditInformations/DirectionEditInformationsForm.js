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
import { Button, Heading, InlineError, Text } from "~/components";

function DirectionEditInformationsForm({
  user,
  handleSubmit,
  cancelLink,
  errorMessage,
}) {
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
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>{"Modifier vos informations"}</Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Vos informations"}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            formik={formik}
            id="prenom"
            placeholder="Prénom"
            validationSchema={directionEditSchema}
          />
          <FormGroupInput
            formik={formik}
            id="nom"
            placeholder="Nom"
            validationSchema={directionEditSchema}
          />
          <FormGroupInput
            formik={formik}
            id="email"
            placeholder="Email"
            validationSchema={directionEditSchema}
          />
        </FormInputBox>
      </Flex>
      {errorMessage && <InlineError message={`${errorMessage}`} />}
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link to={cancelLink}>
            <Button variant="outline">Annuler</Button>
          </Link>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export { DirectionEditInformationsForm };
