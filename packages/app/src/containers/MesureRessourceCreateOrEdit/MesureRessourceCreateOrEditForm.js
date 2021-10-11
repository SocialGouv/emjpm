import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { mesureRessourceSchema } from "~/validation-schemas";
import {
  Button,
  Field,
  Heading,
  InlineError,
  Select,
  Text,
} from "~/components";
import { findOptions } from "~/utils/form";

function initialValues(mesureRessource) {
  return {
    annee: mesureRessource?.annee || "",
    niveau_ressource: mesureRessource?.niveauRessource || "",
    prestations_sociales: mesureRessource?.prestationsSociales || [],
  };
}

export function MesureRessourceCreateOrEditForm(props) {
  const { handleSubmit, handleDelete, handleCancel, mesureRessourceToEdit } =
    props;

  const formik = useFormik({
    initialValues: initialValues(mesureRessourceToEdit),
    onSubmit: handleSubmit,
    validationSchema: mesureRessourceSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          {mesureRessourceToEdit?.id && (
            <Heading size={4} mb={1}>
              {"Modification de la ressource"}
            </Heading>
          )}
          {!mesureRessourceToEdit && (
            <Heading size={4} mb={1}>
              {"Ajout d'une ressource"}
            </Heading>
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
              aria-describedby="msg-prestations_sociales"
            />
            <div id="msg-prestations_sociales">
              {formik.touched.prestations_sociales && (
                <InlineError
                  message={formik.errors.prestations_sociales}
                  fieldId="prestations_sociales"
                />
              )}
            </div>
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
}
