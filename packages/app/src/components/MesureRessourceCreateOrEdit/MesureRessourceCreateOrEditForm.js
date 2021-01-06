import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { mesureRessourceSchema } from "~/lib/validationSchemas";
import { Button, Field, Heading4, InlineError, Select, Text } from "~/ui";
import { findOptions } from "~/util/option/OptionUtil";

const initialValues = (mesureRessource) => {
  return {
    annee: mesureRessource?.annee || "",
    niveau_ressource: mesureRessource?.niveauRessource || "",
    prestations_sociales: mesureRessource?.prestationsSociales || [],
  };
};

export const MesureRessourceCreateOrEditForm = (props) => {
  const {
    handleSubmit,
    handleDelete,
    handleCancel,
    mesureRessourceToEdit,
  } = props;

  const formik = useFormik({
    initialValues: initialValues(mesureRessourceToEdit),
    onSubmit: handleSubmit,
    validationSchema: mesureRessourceSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          {mesureRessourceToEdit?.id && (
            <Heading4 mb={1}>{"Modification de la ressource"}</Heading4>
          )}
          {!mesureRessourceToEdit && (
            <Heading4 mb={1}>{"Ajout d'une ressource"}</Heading4>
          )}
          <Text lineHeight="1.5" color="textSecondary">
            {
              "Merci de renseigner les informations de la ressource de la mesure de la protection"
            }
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Annee"
            id="annee"
            formik={formik}
            validationSchema={mesureRessourceSchema}
            size="small"
          />
          <FormGroupInput
            placeholder="Niveau de Ressource (€)"
            id="niveau_ressource"
            formik={formik}
            validationSchema={mesureRessourceSchema}
            size="small"
          />
          <Field>
            <Select
              instanceId={"prestations_sociales"}
              id="prestations_sociales"
              name="prestations_sociales"
              placeholder="Prestations Sociales"
              value={findOptions(
                MESURE_PROTECTION.PRESTATION_SOCIALES.options,
                formik.values.prestations_sociales
              )}
              hasError={
                formik.errors.prestations_sociales &&
                formik.touched.prestations_sociales
              }
              onChange={(options) => {
                formik.setFieldValue(
                  "prestations_sociales",
                  (options || []).map((o) => o.value)
                );
              }}
              options={MESURE_PROTECTION.PRESTATION_SOCIALES.options}
              isMulti
            />
            {formik.touched.prestations_sociales && (
              <InlineError
                message={formik.errors.prestations_sociales}
                fieldId="prestations_sociales"
              />
            )}
          </Field>
        </FormInputBox>
      </Flex>

      <Flex justifyContent="space-between" py={2}>
        {mesureRessourceToEdit ? (
          <Box>
            <Button bg="error" type="button" onClick={handleDelete}>
              Supprimer
            </Button>
          </Box>
        ) : (
          <Box />
        )}
        <Flex justifyContent="flex-end">
          <Box>
            <Button mr="2" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
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
      </Flex>
    </form>
  );
};
