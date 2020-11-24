import { Button, Heading4, InlineError, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import { React } from "react";
import { Box, Flex } from "rebass";

import { directionEditSchema } from "../../lib/validationSchemas/directionEditSchema";
import { FormGrayBox, FormGroupInput, FormInputBox } from "../AppForm";

const DirectionEditInformationsForm = ({
  user,
  handleSubmit,
  cancelLink,
  errorMessage,
}) => {
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
          <Heading4>{`Modifier vos informations`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Vos informations`}
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
          <Link href={cancelLink}>
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
};

export { DirectionEditInformationsForm };
