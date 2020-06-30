import { Button } from "@emjpm/ui";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import { Box, Flex } from "rebass";

import yup from "../../lib/validationSchemas/yup";
import { formatFormInput } from "../../util";
import { AppFormInputField } from "../AppForm";

const validationSchema = yup.object().shape({
  nom: yup.string().required(),
  prenom: yup.string().required(),
  email: yup.string().required(),
  mandataire: yup.boolean().nullable(),
});
export const ListeBlancheForm = (props) => {
  const { handleCancel, handleSubmit, data } = props;

  const initialValues = useMemo(() => {
    return {
      nom: formatFormInput(data.nom),
      prenom: formatFormInput(data.prenom),
      email: formatFormInput(data.email),
      mandataire: formatFormInput(data.mandataire),
    };
  }, [data]);

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema,
    initialValues,
  });

  return (
    <Box>
      <Flex flexWrap="wrap">
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDirection="row" mt={4}>
            <Flex alignItems="center" flex={1 / 2}>
              <AppFormInputField
                formik={formik}
                validationSchema={validationSchema}
                id="nom"
                label="Nom"
              />
            </Flex>
            <Flex alignItems="center" flex={1 / 2}>
              <AppFormInputField
                formik={formik}
                validationSchema={validationSchema}
                id="prenom"
                label="Prénom"
              />
            </Flex>
            <Flex alignItems="center" flex={1 / 2}>
              <AppFormInputField
                formik={formik}
                validationSchema={validationSchema}
                id="email"
                label="Adresse e-mail"
              />
            </Flex>
            <Flex alignItems="center" flex={1 / 2}>
              {/* <AppFormYesNoField
                formik={formik}
                validationSchema={validationSchema}
                id="mandataire"
                label="Utilisateur"
              /> */}
            </Flex>
          </Flex>
          <Flex justifyContent="flex-end">
            {handleCancel && (
              <Box>
                <Button type="button" mr="2" variant="outline" onClick={handleCancel}>
                  Annuler
                </Button>
              </Box>
            )}
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Enregistrer
              </Button>
            </Box>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
